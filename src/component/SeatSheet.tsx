import {Button, Grid2, MenuItem, TextField} from "@mui/material";
import Seat from "./Seat.tsx";
import {ISeat} from "../recoil/seat/atom.ts";
import {ChangeEvent, useState} from "react";
import {useRecoilState} from "recoil";
import queryAtom from "../recoil/query";
import LabelDialogComponent from "./LabelDialogComponent.tsx";
import labelAtom from "../recoil/label";
import {selectedLabelState} from "../recoil/seat/withLabelFilter.ts";
import {ILabel} from "../recoil/label/atom.ts";
import CustomSnackbar from "./CustomSnackbar.tsx";
import {Project, selectedProjectState} from "../recoil/seat/withProjectFilter.ts";
import {selectedTeamState, Team} from "../recoil/seat/withTeamFilter.ts";

interface ISeatSheet {
  seatList: ISeat[];
}


const teams: Team[] = ["Advanced Build","클라우드데브옵스개발","클라우드네이티브개발","모바일개발","슈퍼앱개발","모바일서비스개발","플랫폼엔지니어링","모던애플리케이션리드","AX리드","AM Innovation","글로벌 Discovery"];
const projects: Project[] = ["NERP", "LAMF", "AI"];

// 자리 데이터 생성 함수
const SeatSheet = (props: ISeatSheet) => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const [labels, setLabels] = useRecoilState(labelAtom);
  const [selectedLabel, setSelectedLabel] = useRecoilState(selectedLabelState);
  const [selectedProject, setSelectedProjcet] = useRecoilState(selectedProjectState);
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamState);

  const [queryState, setQueryState] = useState<string>("");
  const [labelState, setLabelState] = useState<ILabel>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [existSelectedLabel, setExistSelectedLabel] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setLabelState(null);
  };

  // const resetQueryAndLabel = () => {
  //   setQuery({query: ""});
  //   setSelectedLabel(null);
  // }

  const resetFilter = () => {
    // setQuery({query: ""});
    // setSelectedLabel(null);
    // setSelectedProjcet(null);
    // setSelectedTeam(null);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQueryState(e.target.value);
  };
  const to2DArray = <T, >(arr: T[], cols: number): T[][] => {
    return Array.from({length: Math.ceil(arr.length / cols)}, (_, rowIndex) =>
        arr.slice(rowIndex * cols, (rowIndex + 1) * cols)
    );
  };

// 1차원 배열을 2차원 배열 (5행 4열)로 변환
  const seatData = to2DArray(props.seatList, 14);

  const handleQuery = () => {
    const value = queryState;
    resetFilter()
    setQuery({query: value});
  }

  const handleLabel = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    resetFilter()
    const selected = labels.find(label => label.name === e.target.value);
    if (selected) {
      setSelectedLabel(selected);
    } else {
      setSelectedLabel(null);
    }
  };
  const handleProject = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    resetFilter()
    const target = e.target.value;
    if (target) {
      setSelectedProjcet(target as Project);
    }else {
      setSelectedProjcet(null);
    }
  };
  const handleTeam = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    resetFilter()
    const target = e.target.value;
    if (target) {
      setSelectedTeam(target as Team);
    }else{
      setSelectedTeam(null);
    }
  };

  const handleEditLabel = () => {
    if (!selectedLabel) {
      setExistSelectedLabel(true);
      return;
    }
    setOpenDialog(true);
    setLabelState(selectedLabel);
  }

  const handleCreateLabel = () => {
    setOpenDialog(true);
    setLabelState(null);
  }

  const renderQuery = () => {
    return (
        <Grid2 sx={{display: "flex", alignItems: "center"}}>
          <TextField label="이름, 닉네임" name="query" variant="standard" fullWidth value={queryState}
                     onChange={handleChange} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleQuery();
            }
          }}/>
          <Button variant="contained" color="primary" onClick={handleQuery}>
            검색
          </Button>
        </Grid2>
    )
  }

  const renderProject = () => {
    return (
        <Grid2 sx={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
          <TextField label="프로젝트" name="project" variant="standard" fullWidth select value={selectedProject || ""}
                     onChange={handleProject}>
            <MenuItem key="none" value="">
              미선택
            </MenuItem>
            {projects.map((project) => (
                <MenuItem key={project} value={project}>
                  {project}
                </MenuItem>
            ))}
          </TextField>
        </Grid2>
    )
  }
  const renderTeam = () => {
    return (
        <Grid2 sx={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
          <TextField label="팀" name="team" variant="standard" fullWidth select value={selectedTeam || ""}
                     onChange={handleTeam}>
            <MenuItem key="none" value="">
              미선택
            </MenuItem>
            {teams.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
            ))}
          </TextField>
        </Grid2>
    )
  }


  const renderLabel = () => {
    return (
        <>
          <Grid2 sx={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
            <TextField label="라벨" name="label" variant="standard" fullWidth select value={selectedLabel?.name || ""}
                       onChange={handleLabel}>
              <MenuItem key="none" value="">
                미선택
              </MenuItem>
              {labels.map((label, index) => (
                  <MenuItem key={`${label?.name}_${index}`} value={label?.name}>
                    {label?.name}
                  </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleEditLabel}>
              라벨 수정
            </Button>
          </Grid2>
          <Grid2 sx={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
            <Button variant="contained" color="primary" onClick={handleCreateLabel} sx={{width: "100%"}}>
              라벨 생성
            </Button>
          </Grid2>
        </>
    )
  }


  return (
      <Grid2 container direction="row">
        <Grid2 sx={{alignItems: "center", display: "flex"}}>
          <Grid2 sx={{
            backgroundColor: "#D9D9D9",
            width: "2rem",
            height: "10rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div style={{overflowWrap: "anywhere", width: "min-content"}}>엘리베이터</div>
          </Grid2>
        </Grid2>
        <Grid2 container direction="column" spacing={2} sx={{padding: 2}}>
          {seatData.map((row, rowIndex) => (
              <Grid2 container key={rowIndex} justifyContent="center" spacing={0}
                     sx={{backgroundColor: "#D9D9D9", padding: "1rem", width: "50rem"}}>
                <Grid2 container key={`${rowIndex}_1`} justifyContent="center" spacing={0}>
                  {row.slice(0, 7).map((seat, index) => (
                      <Seat seatInfo={seat} key={`seat_${rowIndex}_${index}`}/>
                  ))}
                </Grid2>
                <Grid2 container key={`${rowIndex}_2`} justifyContent="center" spacing={0}>
                  {row.slice(7).map((seat, index) => (
                      <Seat seatInfo={seat} key={`seat_${rowIndex}_${index}`}/>
                  ))}
                </Grid2>
              </Grid2>
          ))}
          {/*<DialogComponent open={openDialog} onClose={handleCloseDialog} onSave={handleSave}/>*/}
        </Grid2>
        <Grid2>
          {renderQuery()}
          {renderProject()}
          {renderTeam()}
          {renderLabel()}
        </Grid2>
        {/* Dialog 컴포넌트 */}
        <LabelDialogComponent open={openDialog} onClose={handleCloseDialog} labelInfo={labelState}/>
        <CustomSnackbar isOpen={existSelectedLabel} onClose={() => setExistSelectedLabel(false)} message="라벨을 선택해주세요."
                        type={"error"}/>
      </Grid2>
  );


}

export default SeatSheet;
