import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/////////////////////////////////////////////////
import React, { useState } from "react";
/////////////////////////////////////////////////
import axios from "axios";
/////////////////////////////////////////////////

const RegisterDialog = ({ open, onClose }) => {
  /////////////////////////////////////////////////
  //Initializing
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");
  const [loading, setLoading] = React.useState(false);
  /////////////////////////////////////////////////
  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== c_password) {
      alert("Password and Confirmed Password Should Be The Same !");
      setLoading(false);
      return;
    }
    if (email && name && password && c_password) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://testing.abi-edu.net/api/register",
          {
            name: name,
            email: email,
            password: password,
            c_password: c_password,
          }
        );
        // Reset the form fields
        setName("");
        setEmail("");
        setPassword("");
        setC_Password("");
        // Loading
        setLoading(false);
        // Close Register Dialog
        onClose();
        console.log("Registration successful:", response.data);
      } catch (error) {
        console.error("Registration failed:", error.response.data);
        alert("There Is Some Problem In Register , Please Try Later :(");
        // Reset the form fields
        setName("");
        setEmail("");
        setPassword("");
        setC_Password("");
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
    <Dialog open={open} onClose={onClose}>
      <ThemeProvider theme={theme}>
        <DialogTitle sx={{ fontFamily: "Montserrat", fontWeight: "bolder" }}>
          {" "}
          Join Us And Let Your Dreams Unfold On The Screen !
        </DialogTitle>
        <DialogContent sx={{ margin: "8px" }}>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            required
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
            }}
          />
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
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            required
            variant="outlined"
            value={c_password}
            onChange={(e) => setC_Password(e.target.value)}
            sx={{
              boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRegister}
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
            Sign Up
          </Button>
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );
};

export default RegisterDialog;
