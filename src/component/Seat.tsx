import {Card, CardContent, Grid2, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import DialogComponent from "./DialogComponent.tsx";
import {ISeat} from "../recoil/seat/atom.ts";
import {useRecoilValue} from "recoil";
import {withFilter, withLabeledFilter, withProjectFilter, withQueryFilter, withTeamFilter} from "../recoil/seat";
import styles from '../assets/style/seat.module.css';


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
    setIsSelected((prev) => !prev);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsSelected((prev) => !prev);
    setOpenDialog(false);
  };

  return (
    <>
      <Grid2 key={seatId} onClick={handleOnClick}>
        <Card
          className={`
            ${styles['seat-card']} 
            ${isSelected ? styles['seat-card-selected'] : styles['seat-card-normal']}
            ${user ? styles['seat-occupied'] : styles['seat-empty']}
            ${filteredSeat.some(seat => seat.seatId === seatId) ? styles['seat-highlighted'] : ''}
          `}
          sx={{ backgroundColor: seatColor }}
        >
          <CardContent>
            <Typography 
              variant="body2" 
              className={styles['seat-text']}
            >
              {user && `${user.nickname}\n(${user.name})`}
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <DialogComponent open={openDialog} onClose={handleCloseDialog} seatInfo={props.seatInfo}/>
    </>
  )
}
export default Seat;
