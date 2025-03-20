import { TextField, Button, Grid } from "@mui/material";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
/////////////////////////////////////////////////
import React, { useState } from "react";
import axiosInstance from "../../services/axios";
import { useEffect } from "react";
import CustomSnackbar from "../CustomSnackbar";
/////////////////////////////////////////////////
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const MovieForm = () => {
  /////////////////////////////////////////////////
  //Initializing
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  /////////////////////////////////////////////////
  //fetching Categories & Actors
  useEffect(() => {
    axiosInstance
      .get("http://testing.abi-edu.net/api/categories")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axiosInstance
      .get("http://testing.abi-edu.net/api/actors")
      .then((response) => setActors(response.data))
      .catch((error) => console.error("Error fetching actors:", error));
  }, [categories.length, actors.length]);
  /////////////////////////////////////////////////
  // Close SnackBar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  /////////////////////////////////////////////////
  //Add Movie
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", selectedCategory);
    formData.append("actor_id", selectedActors);
    formData.append("image", image);
    console.log("Selected Actors Are", selectedActors);
    /* In Case Of Multiple Actors :
      selectedActors.forEach((actor) => formData.append("actor_id", actor)); */

    axiosInstance
      .post("http://testing.abi-edu.net/api/movies", formData)
      .then((response) => {
        console.log("Movie created successfully:", response.data.data);
        // Reset the form fields
        setTitle("");
        setDescription("");
        setSelectedCategory("");
        setSelectedActors([]);
        setImage(null);
        setFileName("");
        // Loading
        setLoading(false);
        // SnackBar
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error creating Movie:", error);
        alert("There Is Some Problem In Creating Movie , Please Try Later :(");
        setTitle("");
        setDescription("");
        setSelectedCategory("");
        setSelectedActors([]);
        setImage(null);
        setFileName("");
        setLoading(false);
      });
  };
  /////////////////////////////////////////////////
  //For Image
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFileName(files[0].name);
      setImage(event.target.files[0]);
    } else {
      setFileName("");
    }
  };
  /////////////////////////////////////////////////
  return (
    <Box
      component="div"
      sx={{
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
              margin="dense"
              sx={{
                boxShadow: "0px 4px 20px rgba(58, 52, 54, 0.5)",
              }}
              label="Movie Title"
              type="text"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              sx={{
                boxShadow: "0px 4px 20px rgba(58, 52, 54, 0.5)",
              }}
              label="Movie Description"
              type="text"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              required
              margin="dense"
              sx={{
                boxShadow: "0px 4px 20px rgba(58, 52, 54, 0.5)",
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ textAlign: "start" }}
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              required
              margin="dense"
              sx={{
                boxShadow: "0px 4px 20px rgba(58, 52, 54, 0.5)",
              }}
            >
              <InputLabel>Actors</InputLabel>
              <Select
                /*    multiple */
                value={selectedActors}
                onChange={(e) => setSelectedActors(e.target.value)}
                /*   renderValue={(selected) => {
                  const selectedNames = actors
                    .filter((actor) => selected.includes(actor.id))
                    .map((actor) => actor.name);
                  return selectedNames.join(", ");
                }} */
                sx={{ textAlign: "start" }}
              >
                <MenuItem value="">
                  <em>Select Actor</em>
                </MenuItem>
                {actors.map((actor) => (
                  <MenuItem key={actor.id} value={actor.id}>
                    {/*  <Checkbox checked={selectedActors.indexOf(actor.id) > -1} /> */}
                    {/*  <ListItemText primary={actor.name} /> */}
                    {actor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {fileName ? fileName : "Upload Poster"}
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              loading={loading}
              loadingPosition="end"
            >
              Create Movie
            </Button>
          </Grid>
        </Grid>
      </form>
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message="Movie Created Successfully! Go Check Library :) "
        color="success" // "error", "warning", "info", "success"
      />
    </Box>
  );
};

export default MovieForm;
