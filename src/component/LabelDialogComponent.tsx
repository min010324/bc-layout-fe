import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomSnackbar from "./CustomSnackbar.tsx";
import {ILabel} from "../recoil/label/atom.ts";
import {IUser} from "../recoil/user/atom.ts";
import {API} from "../util/api.ts";

enum Mode {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

interface LabelDialogProps {
  open: boolean;
  onClose: () => void;
  labelInfo: ILabel | null;
}

const LabelDialogComponent = ({open, onClose, labelInfo}: LabelDialogProps) => {
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>(labelInfo?.users || []);
  const [formData, setFormData] = useState<ILabel>(labelInfo);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isFailToSave, setIsFailToSave] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [mode, setMode] = useState<Mode>(Mode.CREATE); // 읽기/쓰기 모드 상태
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/user/all").then(res => {
      console.log(res);
      setUserList(res.data);
    })
  }, []);

  useEffect(() => {
    if (labelInfo) {
      setMode(Mode.EDIT);
      setFormData(labelInfo);
      setSelectedUsers(labelInfo.users)
    } else {
      setMode(Mode.CREATE);
      setFormData({name: "", users: []});
      setSelectedUsers([])
    }
  }, [labelInfo]);
  const handleChangeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, name: e.target.value});
  };

  const handleSave = async () => {// todo
    const body = {
      name: formData.name,
      labelId: formData?.labelId,
      userList: selectedUsers.map(user => user.userId) //todo user id를 남기는게 맞을지...
    };
    await API.post("/label", body).then(() => {
      setMode(Mode.EDIT);
      onClose();
      navigate(0);
    }).catch((err) => {
      setMessage(err.response.data.message);
      setIsFailToSave(true);
    });

  };
  const handleEdit = () => {
    setMode(Mode.EDIT);
  };

  const handleCancle = () => {
    setFormData(labelInfo);
    setMode(Mode.EDIT);
  };


  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>라벨</div>
            <CloseIcon onClick={onClose}/>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2} columns={1}>
            <Grid2 xs={6} size={1}>
              <TextField label="라벨 이름" name="name" variant="standard" fullWidth value={formData?.name}
                         onChange={handleChangeName} disabled={mode === Mode.EDIT}/>
            </Grid2>
            <Grid2 xs={6} size={1}>
              <Autocomplete
                  multiple
                  options={userList}
                  limitTags={2}
                  disableCloseOnSelect
                  getOptionLabel={(option) => `${option.nickname}(${option.name})`}
                  value={selectedUsers}
                  onChange={(_, newValue: IUser[]) => setSelectedUsers(newValue)}
                  renderInput={(params) => <TextField {...params} label="소속 인원" placeholder="인원을 선택하세요"/>}
                  renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                          <Chip {...getTagProps({index})} key={`${option.email}`}
                                label={`${option.nickname}(${option.name})`}/>
                      ))
                  }
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {mode === Mode.EDIT ? "수정하기" : "생성하기"}
          </Button>
        </DialogActions>
        <CustomSnackbar isOpen={isInvalid} onClose={() => setIsInvalid(false)} message={"사용 마감일을 입력해주세요"}
                        type={"error"}/>
        <CustomSnackbar isOpen={isFailToSave} onClose={() => setIsFailToSave(false)} message={message}
                        type={"error"}/>
      </Dialog>
  );
};

export default LabelDialogComponent;
