import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  MenuItem,
  SnackbarCloseReason,
  TextField
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {SyntheticEvent, useEffect, useState} from "react";
import {ISeat} from "../recoil/seat/atom.ts";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from 'dayjs';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useRecoilValue} from "recoil";
import userAtom from "../recoil/user";
import {API} from "../util/api.ts";
import {useNavigate} from "react-router-dom";
import CustomSnackbar from "./CustomSnackbar.tsx";

enum Mode {
  NOT_USE = "NOT_USE",
  USE = "USE",
  EDIT = "EDIT",
}

interface SeatDialogProps {
  open: boolean;
  onClose: () => void;
  seatInfo: ISeat;
  // onSave: (updatedSeat: any) => void;
}

const teams = ["Advanced Build", "Design Team", "Engineering"];
const projects = ["NERP", "LAMF", "Alpha"];

const DialogComponent = ({open, onClose, seatInfo}: SeatDialogProps) => {
  const myInfo = useRecoilValue(userAtom);
  const [formData, setFormData] = useState<ISeat>(seatInfo);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isFailToSave, setIsFailToSave] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [mode, setMode] = useState<Mode>(Mode.NOT_USE); // 읽기/쓰기 모드 상태
  const navigate = useNavigate();

  useEffect(() => {
    if ("Y" === seatInfo.useYn) {
      setMode(Mode.USE);
    } else {
      setFormData({...formData, user: myInfo, endDate: ''}); // yyyy-MM-dd 형식으로 변환
    }
  }, [myInfo]);

  const handleDate = (newValue: Dayjs) => {
    if (newValue) {
      setFormData({...formData, endDate: newValue.format("YYYY-MM-DD")}); // yyyy-MM-dd 형식으로 변환
    }
  };

  const handleSave = async () => {
    if (!formData.endDate) {
      setIsInvalid(true);
      return;
    }
    const body = {
      seatId: seatInfo.seatId,
      useYn: "Y",
      endDate: formData.endDate,
    };
    await API.post("/seat", body).then(() => {
      // onSave(formData);
      setMode(Mode.USE);
      onClose();
      navigate(0);
    }).catch((err) => {
      setMessage(err.response.data.message);
      setIsFailToSave(true);
    });

  };
  const handleNotUsed = async () => {
    setMode(Mode.NOT_USE);
    const body = {
      seatId: seatInfo.seatId,
      useYn: "N",
      endDate: seatInfo.endDate,
    };
    const res = await API.post("/seat", body);
    console.log(res);
    onClose();
    navigate(0);
  };
  const handleEdit = () => {
    setMode(Mode.EDIT);
  };

  const handleCancle = () => {
    setFormData(seatInfo);
    setMode(Mode.USE);
  };


  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>자리 정보</div>
            <CloseIcon onClick={onClose}/>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2} columns={2}>
            <Grid2 xs={6} size={1}>
              <TextField label="내 이름" name="name" variant="standard" fullWidth value={formData.user?.name} disabled/>
            </Grid2>
            <Grid2 xs={6} size={1}>
              <TextField label="닉네임" name="nickname" variant="standard" fullWidth value={formData.user?.nickname}
                         disabled/>
            </Grid2>
            <Grid2 xs={6} size={1}>
              <TextField label="소속 팀" name="team" variant="standard" fullWidth select value={formData.user?.team}
                         disabled>
                {teams.map((team) => (
                    <MenuItem key={team} value={team}>
                      {team}
                    </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={6} size={1}>
              <TextField label="소속 프로젝트" name="project" variant="standard" fullWidth select
                         value={formData.user?.project} disabled>
                {projects.map((project) => (
                    <MenuItem key={project} value={project}>
                      {project}
                    </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={12} size={2} sx={{display: "flex", justifyContent: "center"}} height={100}>
              {/*<TextField label="이용 마감일" name="endDate" type="date" fullWidth value={formatDate(formData.endDate)}*/}
              {/*           onChange={handleChange} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditMode}/>*/}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{width: "20rem"}}
                    label="이용 마감일"
                    value={formData.endDate ? dayjs(formData.endDate) : null} // endDate가 없을 경우 null 반환
                    onChange={handleDate}
                    disabled={mode === Mode.USE}
                />
              </LocalizationProvider>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          {mode === Mode.EDIT ? (
              <>
                <Button onClick={handleCancle}>취소</Button>
                <Button variant="contained" color="secondary" onClick={handleNotUsed}>
                  반납하기
                </Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  이용하기
                </Button>
              </>
          ) : (
              mode === Mode.USE ? (
                  <Button variant="contained" color="primary" onClick={handleEdit}
                          disabled={seatInfo?.user?.email !== myInfo?.email}>
                    수정하기
                  </Button>
              ) : (
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    이용하기
                  </Button>
              )

          )}
        </DialogActions>
        <CustomSnackbar isOpen={isInvalid} onClose={() => setIsInvalid(false)} message={"사용 마감일을 입력해주세요"}
                        type={"error"}/>
        <CustomSnackbar isOpen={isFailToSave} onClose={() => setIsFailToSave(false)} message={message}
                        type={"error"}/>
      </Dialog>
  );
};

export default DialogComponent;
