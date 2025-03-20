import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
/////////////////////////////////////////////////
import LogedinHeader from "../sections/LogedinHeader";
import CategoryForm from "../components/Category CRUD/CategoryForm";
import Footer from "../sections/Footer";
import CategoryCard from "../components/Cards/CategoryCard";
/////////////////////////////////////////////////
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import CustomSnackbar from "../components/CustomSnackbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FF0055",
    },
    third: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});
/////////////////////////////////////////////////

export default function Category() {
  /////////////////////////////////////////////////
  //Initializing
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  /////////////////////////////////////////////////
  //fetching For The First Time
  useEffect(() => {
    fetchCategories();
  }, []);
  /////////////////////////////////////////////////
  //fetching
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(
        "http://testing.abi-edu.net/api/categories"
      );
      console.log("Categories API", response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.error("failed fetching Categories", error);
      alert(
        "There is Problem in Fetching Categories From Server , Please Try Later :("
      );
    } finally {
      setLoading(false);
    }
  };
  /////////////////////////////////////////////////
  //Update Category
  const handleSave = () => {
    setLoadingButton(true);
    console.log("selected Category id", selectedCategory.id);
    console.log("selected Category Name after Editing", selectedCategory.name);
    axiosInstance
      .post(
        `http://testing.abi-edu.net/api/categories/${selectedCategory.id}`,
        {
          _method: "PUT",
          name: selectedCategory.name,
        }
      )
      .then((response) => {
        setCategories(
          categories.map((category) =>
            category.id === selectedCategory.id ? response.data.data : category
          )
        );
        console.log("Updating Category Success", response.data.data);
        fetchCategories();
        setLoadingButton(false);
        // Close Updating Dialog
        setOpen(false);
        setOpenSnack(true);
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        alert(
          "There is Problem in Updating Category From Server , Please Try Later :("
        );
        setLoadingButton(false);
      });
  };
  /////////////////////////////////////////////////
  //Close Updating Dialog
  const handleClose = () => {
    setOpen(false);
  };
  /////////////////////////////////////////////////
  const handleDeleteCategory = async (id) => {
    setLoadingButton(true);
    try {
      await axiosInstance.delete(
        `http://testing.abi-edu.net/api/categories/${currentCategoryId}`
      );
      console.log("deleting category success");
      fetchCategories();
      setLoadingButton(false);
      setOpenDelete(false);
      setOpenSnack(true);
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(
        "There is Problem in Deleting Category From Server , Please Try Later :("
      );
      setLoadingButton(false);
    }
  };
  /////////////////////////////////////////////////
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  /////////////////////////////////////////////////
  const isLargeOrDown = useMediaQuery(theme.breakpoints.down("lg"));
  /////////////////////////////////////////////////

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flexGrow: 1,
            backgroundImage: 'url("/images/main.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "fit-content",
            position: "relative",
          }}
        >
          {/* طبقة السواد */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.85)",
            }}
          />
          <LogedinHeader />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: isLargeOrDown ? "column" : "row",
              margin: "8px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
                zIndex: 1,
                marginTop: "8%",
                margin: "5px",
                width: isLargeOrDown ? "100%" : "40%",
                marginRight: isLargeOrDown ? "20px" : "40px",
              }}
            >
              <Typography
                variant={isLargeOrDown ? "h6" : "h4"}
                component="div"
                sx={{
                  fontFamily: "Montserrat",
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(26, 26, 26, 0.2)",
                  boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
                  width: "100%",
                  textAlign: "center",
                  color: "white",
                  padding: "18px",
                  marginBottom: "2%",
                  marginTop: "2%",
                }}
              >
                Add Your Favourite Category
              </Typography>
              <CategoryForm />
            </Box>

            <Box
              sx={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "500px",
                width: isLargeOrDown ? "100%" : "60%",
                marginLeft: isLargeOrDown ? 0 : "20px",
                marginTop: isLargeOrDown ? "20px" : 0,
                zIndex: 1,
              }}
            >
              <Grid container spacing={3}>
                {loading ? (
                  <Box
                    sx={{
                      marginTop: "5%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      sx={{ color: "grey.500" }}
                      spacing={2}
                      direction="row"
                    >
                      <CircularProgress color="main" />
                    </Stack>
                    <Typography sx={{ color: "white" }}>
                      please be patient :)
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <Grid item xs={12} sm={6} md={6} key={category.id}>
                          <CategoryCard
                            category={category}
                            onDelete={() => {
                              setCurrentCategoryId(category.id);
                              setOpenDelete(true);
                            }}
                            onEdit={(category) => {
                              setCurrentCategoryId(category.id);
                              setSelectedCategory(category);
                              setOpen(true);
                            }}
                          />
                        </Grid>
                      ))
                    ) : (
                      <Typography sx={{ color: "white" }}>
                        No Categories In Library Yet :(
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
              {/* ///////////////////////////////////////////////// */}
              {/* Edit Category Dialog */}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                  sx={{ fontFamily: "Montserrat", fontWeight: "bolder" }}
                >
                  Edit Category
                </DialogTitle>
                <DialogContent sx={{ margin: "8px" }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="Category Name"
                        value={selectedCategory.name}
                        onChange={(e) =>
                          setSelectedCategory({
                            ...selectedCategory,
                            name: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ textAlign: "center" }}>
                  <Grid item xs={12}>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      loading={loadingButton}
                      loadingPosition="end"
                      color="secondary"
                    >
                      Save
                    </Button>
                  </Grid>
                </DialogActions>
              </Dialog>
              {/* ///////////////////////////////////////////////// */}
              {/* Delete Category Dialog */}
              <Dialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle>Are You Sure....?</DialogTitle>
                <DialogContent>You Want To Delete This Item ?</DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenDelete(false)}>No</Button>
                  <Button
                    onClick={handleDeleteCategory}
                    loading={loadingButton}
                    loadingPosition="end"
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
          <Footer />
        </Box>
        {/* For Confirmation */}
        <CustomSnackbar
          open={openSnack}
          handleClose={handleCloseSnack}
          message="Operation Done Successfully!"
          color="success" // "error", "warning", "info", "success"
        />
      </ThemeProvider>
    </>
  );
}
