import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import "../../styles/Header.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/////////////////////////////////////////////////
import React, { useState } from "react";
/////////////////////////////////////////////////
import axios from "axios";
import { useNavigate } from "react-router-dom";
/////////////////////////////////////////////////
import RegisterDialog from "./RegisterDialog";
/////////////////////////////////////////////////

const LoginDialog = ({ open, onClose }) => {
  /////////////////////////////////////////////////
  //Initializing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  /////////////////////////////////////////////////
  const navigate = useNavigate();
  /////////////////////////////////////////////////
  const handleLogin = async (event) => {
    event.preventDefault();
    if (email && password) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://testing.abi-edu.net/api/login",
          {
            email: email,
            password: password,
          }
        );
        // Reset the form fields
        setEmail("");
        setPassword("");
        // Loading
        setLoading(false);
        // Close Login Dialog
        onClose();
        console.log("Login successful:", response.data);
        navigate(`/Home`);
      } catch (error) {
        console.error("Login failed:", error.response.data);
        alert("There Is Some Problem In Login , Please Try Later :(");
        // Reset the form fields
        setEmail("");
        setPassword("");
        // Loading
        setLoading(false);
      }
    } else {
      alert("Fill All Inputs Please !");
      setLoading(false);
      return;
    }
  };
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
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(26, 26, 26, 0.2)",
        }}
      >
        <ThemeProvider theme={theme}>
          <DialogTitle sx={{ fontFamily: "Montserrat", fontWeight: "bolder" }}>
            {" "}
            Welcome Back !
          </DialogTitle>
          <DialogContent sx={{ margin: "8px" }}>
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              required
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
              }}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              required
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              loading={loading}
              loadingPosition="end"
              sx={{
                color: "whitesmoke",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
                },
              }}
            >
              Sign In
            </Button>
          </DialogActions>
          <Typography
            variant="body2"
            align="center"
            sx={{ padding: "6px", fontWeight: "bold" }}
          >
            First Time On DreamFlix?
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setSignUpOpen(true)}
              sx={{
                marginLeft: "4px",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
                },
              }}
            >
              Sign Up
            </Button>
          </Typography>
        </ThemeProvider>
      </Dialog>
      <RegisterDialog open={signUpOpen} onClose={() => setSignUpOpen(false)} />
    </>
  );
};

export default LoginDialog;
