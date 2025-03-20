import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/////////////////////////////////////////////////
import React, { useState } from "react";
import axiosInstance from "../services/axios";
/////////////////////////////////////////////////
import CustomSnackbar from "./CustomSnackbar";
import "../styles/Header.css";
/////////////////////////////////////////////////

const RateDialog = ({ open, onClose, movie }) => {
  /////////////////////////////////////////////////
  //Initializing
  const [value, setValue] = useState(1);
  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = React.useState(false);

  /////////////////////////////////////////////////
  const handleRating = () => {
    setLoading(true);
    axiosInstance
      .post("http://testing.abi-edu.net/api/rates", {
        movie_id: movie.id,
        rate: value,
      })
      .then((response) => {
        console.log("Movie Rated successfully:", response.data.data);
        setLoading(false);
        onClose();
        setValue(1);
        setOpenSnack(true);
      })
      .catch((error) => {
        console.error("Error rating Movie:", error);
        alert("Error In Rating Movie , Please Try Later :(");
      });
  };
  /////////////////////////////////////////////////
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  /////////////////////////////////////////////////
  // Close Rating Dialog
  function handleClose() {
    onClose();
  }
  /////////////////////////////////////////////////
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF0055",
      },
      secondary: {
        main: "#ffffff",
      },
    },
    typography: {
      fontFamily: "Roboto",
    },
  });
  /////////////////////////////////////////////////
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(26, 26, 26, 0.2)",
        }}
      >
        <ThemeProvider theme={theme}>
          <DialogTitle sx={{ fontFamily: "Montserrat", fontWeight: "bolder" }}>
            {" "}
            How Much Do You Give !
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 0.5,
                top: 0.5,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon onClick={handleClose} />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ margin: "8px" }}>
            <Rating
              name="movie-rating"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{
                backgroundColor: "rgba(247, 247, 211, 0.44)",
                boxShadow: "0px 4px 20px rgba(219, 225, 161, 0.5)",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              size="small"
              color="primary"
              loading={loading}
              onClick={handleRating}
              loadingPosition="end"
            >
              Rate
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
      <CustomSnackbar
        open={openSnack}
        handleClose={handleCloseSnack}
        message="Rating Done Successfully!"
        color="success" // "error", "warning", "info", "success"
      />
    </>
  );
};

export default RateDialog;
