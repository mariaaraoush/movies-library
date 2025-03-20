import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//////////////////////////////////////////////////
import * as React from "react";
import { useState } from "react";
//////////////////////////////////////////////////
import LoginDialog from "../components/Register Login/LoginDialog";
//////////////////////////////////////////////////
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
//////////////////////////////////////////////////
export default function RegisterHeader() {
  //////////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  //////////////////////////////////////////////////
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //////////////////////////////////////////////////
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(255, 0, 150, 0))", // تدرج من الأسود إلى الشفاف
            color: "#FF0055",
          }}
        >
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: "whitesmoke",
                fontWeight: "bold",
                fontFamily: "Montserrat",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  color: "#FF0055",
                  cursor: "pointer",
                  boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
                },
              }}
            >
              DreamFlix
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="outlined"
              sx={{
                color: "whitesmoke",
                fontSize: "medium",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  color: "#FF0055",
                  boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
                },
              }}
              onClick={handleClickOpen}
            >
              Sign in
            </Button>
          </Toolbar>
        </AppBar>
        <LoginDialog open={open} onClose={handleClose} />
      </Box>
    </ThemeProvider>
  );
}
