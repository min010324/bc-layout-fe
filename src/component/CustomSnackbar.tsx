import {Alert, Snackbar, SnackbarCloseReason} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {AlertColor} from "@mui/material/Alert/Alert";

interface ICustomSnackbar{
  isOpen: boolean;
  message: string;
  type: AlertColor;
  onClose: () => void;

}
const CustomSnackbar = (props: ICustomSnackbar) => {
  const handleCloseSanckBar = (
      event: SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    props.onClose();
  };

  return (
      <Snackbar
          anchorOrigin={{vertical: "bottom", horizontal: "center"}}
          open={props.isOpen}
          onClose={handleCloseSanckBar}
          autoHideDuration={1000}
      >
        <Alert
            onClose={handleCloseSanckBar}
            severity={props.type}
            variant="filled"
            sx={{width: '100%'}}
        >
          {props.message}
        </Alert>

      </Snackbar>
  )
}
export default CustomSnackbar;
