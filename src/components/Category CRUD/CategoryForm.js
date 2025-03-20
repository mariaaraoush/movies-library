import { TextField, Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
/////////////////////////////////////////////////
import React, { useState } from "react";
import axiosInstance from "../../services/axios";
import CustomSnackbar from "../CustomSnackbar";
/////////////////////////////////////////////////

const CategoryForm = () => {
  /////////////////////////////////////////////////
  //Initializing
  const [myCategories, SetMyCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  /////////////////////////////////////////////////
  //Add Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "http://testing.abi-edu.net/api/categories",
        { name: name }
      );
      console.log("Category created successfully:", response.data.data);
      SetMyCategories(response.data.data);
      console.log("Categories", myCategories);
      // Reset the form fields
      setName("");
      // Loading
      setLoading(false);
      // SnackBar
      setOpen(true);
    } catch (error) {
      console.error("Failed Creating Category", error);
      alert("There Is Some Problem In Creating Category , Please Try Later :(");
      setName("");
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
              label="Category Name"
              variant="outlined"
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
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              loading={loading}
              loadingPosition="end"
            >
              Create Category
            </Button>
          </Grid>
        </Grid>
      </form>
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message="Category Created Successfully! Go Check Library :) "
        color="success" // "error", "warning", "info", "success"
      />
    </Box>
  );
};

export default CategoryForm;
