import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axiosInstance from "../../services/axios";
import CustomSnackbar from "../CustomSnackbar";
/////////////////////////////////////////////////

const ActorForm = () => {
  /////////////////////////////////////////////////
  //Initializing
  const [myActors, SetMyActors] = useState([]);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  /////////////////////////////////////////////////
  //Add Actor
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "http://testing.abi-edu.net/api/actors",
        { name: name, birthdate: birthdate }
      );
      console.log("Actor created successfully:", response.data);
      SetMyActors(response.data);
      console.log("Actors", myActors);
      // Reset the form fields
      setName("");
      setBirthdate("");
      // Loading
      setLoading(false);
      // SnackBar
      setOpen(true);
    } catch (error) {
      console.error("Failed Creating Actor", error);
      alert("There Is Some Problem In Creating Actor , Please Try Later :(");
      setName("");
      setBirthdate("");
      setLoading(false);
    }
  };
  /////////////////////////////////////////////////
  //Close SnackBar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  /////////////////////////////////////////////////
  return (
    <Box
      component="div"
      sx={{
        fontFamily: "Montserrat",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(229, 216, 216, 0.65)",
        boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
        width: "100%",
        textAlign: "center",
        color: "white",
        padding: "18px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Actor Name"
              variant="outlined"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{
                boxShadow: "0px 4px 20px rgba(58, 52, 54, 0.5)",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <TextField
                sx={{
                  boxShadow: "0px 4px 20px rgba(58, 52, 54, 0.5)",
                }}
                type="Date"
                label="Actor BirthDate"
                variant="outlined"
                fullWidth
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              loading={loading}
              loadingPosition="end"
            >
              Create Actor
            </Button>
          </Grid>
        </Grid>
      </form>
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message="Actor Created Successfully! Go Check Library :) "
        color="success" // "error", "warning", "info", "success"
      />
    </Box>
  );
};

export default ActorForm;
