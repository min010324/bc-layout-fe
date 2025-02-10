import {Card, CardContent, Grid2, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import DialogComponent from "./DialogComponent.tsx";
import {ISeat} from "../recoil/seat/atom.ts";
import {useRecoilValue} from "recoil";
import {withFilter, withLabeledFilter, withProjectFilter, withQueryFilter, withTeamFilter} from "../recoil/seat";


interface ISeatProps {
  seatInfo: ISeat;
}

const Seat = (props: ISeatProps) => {
  const {seatId, user} = props.seatInfo;
  const [seatColor, setSeatColor] = useState<string>("#D9D9D9");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const filteredSeat = useRecoilValue(withFilter);
  const queriedSeat = useRecoilValue(withQueryFilter);
  const labeledSeat = useRecoilValue(withLabeledFilter);
  const projectSeat = useRecoilValue(withProjectFilter);
  const teamSeat = useRecoilValue(withTeamFilter);

  useEffect(() => {
    if (!user) {
      setSeatColor("#D9D9D9");
      return;
    }
    if (filteredSeat.some(seat => seat.seatId === seatId)) {
      setSeatColor("#FDFD96");
    } else {
      setSeatColor("#FFF");
    }

    // if (queriedSeat.some(seat => seat.seatId === seatId)) {
    //   setSeatColor("#FDFD96");
    // } else {
    //   setSeatColor("#FFF");
    // }
    // if (labeledSeat.some(seat => seat.seatId === seatId)) {
    //   setSeatColor("#add8e6");
    // }
    //
    // if (projectSeat.some(seat => seat.seatId === seatId)) {
    //   setSeatColor("#bdecb6");
    // }
    //
    // if (teamSeat.some(seat => seat.seatId === seatId)) {
    //   setSeatColor("#ffa85c");
    // }


  }, [user, queriedSeat, labeledSeat, filteredSeat]);

  const handleOnClick = () => {
    setIsSelected((prev) => !prev); // 클릭할 때마다 상태 변경
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsSelected((prev) => !prev); // 클릭할 때마다 상태 변경
    setOpenDialog(false);
  };

  return (
      <>
        <Grid2 key={seatId} onClick={handleOnClick}>
          <Card
              sx={{
                backgroundColor: `${seatColor}`,
                width: 100,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${isSelected ? "red" : "black"}`, // 선택 시 테두리 색 변경
                cursor:"pointer"
              }}
          >
            <CardContent>
              <Typography variant="body2" align="center" sx={{whiteSpace: "pre-wrap"}}>
                {user ? `${user?.nickname}\n(${user?.name})` : ""}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        {/* Dialog 컴포넌트 */}
        <DialogComponent open={openDialog} onClose={handleCloseDialog} seatInfo={props.seatInfo}/>
      </>
  )
}
export default Seat;
