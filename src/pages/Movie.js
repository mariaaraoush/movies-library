import LogedinHeader from "../sections/LogedinHeader";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/////////////////////////////////////////////////
import MovieForm from "../components/Movies CRUD/MovieForm";
import Footer from "../sections/Footer";
import TVCard from "../components/Cards/TVCard";
import CustomSnackbar from "../components/CustomSnackbar";
/////////////////////////////////////////////////
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
/////////////////////////////////////////////////
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
/////////////////////////////////////////////////
export default function Movie() {
  /////////////////////////////////////////////////
  //Initializing
  const [movies, setMovies] = useState([]);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [actors, setActors] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    actor_id: "",
    category_id: "",
  });
  /////////////////////////////////////////////////
  //fetching For The First Time And When Add & Delete Movie
  useEffect(() => {
    fetchMovies();
  }, []);
  useEffect(() => {
    fetchMovies();
  }, [movies.length]);
  /////////////////////////////////////////////////
  //fetching
  useEffect(() => {
    axiosInstance
      .get("http://testing.abi-edu.net/api/categories")
      .then((response) => setCategories(response.data.data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        alert(
          "There is Problem in Fetching Categories From Server , Please Try Later :("
        );
      });

    axiosInstance
      .get("http://testing.abi-edu.net/api/actors")
      .then((response) => setActors(response.data))
      .catch((error) => {
        console.error("Error fetching actors:", error);
        alert(
          "There is Problem in Fetching Actors From Server , Please Try Later :("
        );
      });
  }, []);
  /////////////////////////////////////////////////
  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get(
        "http://testing.abi-edu.net/api/movies"
      );
      console.log("Movies API", response.data.data);
      setMovies(response.data.data);
    } catch (error) {
      console.log("Error Fetching Movies", error);
      alert(
        "There is Problem in Fetching Movies From Server , Please Try Later :("
      );
    } finally {
      setLoading(false);
    }
  };
  /////////////////////////////////////////////////
  //For Image
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFileName(files[0].name);
      setSelectedMovie({
        ...selectedMovie,
        image: event.target.files[0],
      });
    } else {
      setFileName("");
    }
  };
  /////////////////////////////////////////////////
  //Update Movie
  const handleSave = () => {
    setLoadingButton(true);
    console.log("selected Movie id", selectedMovie.id);
    console.log("selected Movie Name after Editing", selectedMovie.title);
    const formData = new FormData();
    formData.append("title", selectedMovie.title);
    formData.append("description", selectedMovie.description);
    formData.append("category_id", selectedMovie.category_id);
    formData.append("actor_id", selectedMovie.actor_id);
    formData.append("image", selectedMovie.image);
    formData.append("_method", "PUT");
    axiosInstance
      .post(
        `http://testing.abi-edu.net/api/movies/${selectedMovie.id}`,
        formData
      )
      .then((response) => {
        setMovies(
          movies.map((movie) =>
            movie.id === selectedMovie.id ? response.data.data : movie
          )
        );
        console.log("Updating Movie Success", response.data.data);
        fetchMovies();
        setLoadingButton(false);
        //Close Updating Dialog
        setOpen(false);
        setOpenSnack(true);
      })
      .catch((error) => {
        console.error("Error updating movies:", error);
        alert(
          "There is Problem in Updating Movie From Server , Please Try Later :("
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
  const handleDeleteMovie = async (id) => {
    setLoadingButton(true);
    try {
      await axiosInstance.delete(
        `http://testing.abi-edu.net/api/movies/${currentMovieId}`
      );
      console.log("deleting movie success");
      fetchMovies();
      setLoadingButton(false);
      setOpenDelete(false);
      setOpenSnack(true);
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert(
        "There is Problem in Deleting Movie From Server , Please Try Later :("
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
                Add Your Favourite Movie
              </Typography>
              <MovieForm />
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
                    {movies.length > 0 ? (
                      movies.map((movie, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <TVCard
                            movie={movie}
                            onDelete={() => {
                              setCurrentMovieId(movie.id);
                              setOpenDelete(true);
                            }}
                            onEdit={(movie) => {
                              setCurrentMovieId(movie.id);
                              setSelectedMovie(movie);
                              setOpen(true);
                            }}
                          />
                        </Grid>
                      ))
                    ) : (
                      <Typography sx={{ color: "white" }}>
                        No Movies In Library Yet..Create One !
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
              {/* ///////////////////////////////////////////////// */}
              {/* Edit Movie Dialog */}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                  sx={{ fontFamily: "Montserrat", fontWeight: "bolder" }}
                >
                  Edit Movie
                </DialogTitle>
                <DialogContent sx={{ margin: "8px" }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "16px",
                        }}
                      >
                        <TextField
                          fullWidth
                          required
                          margin="dense"
                          label="Movie Name"
                          value={selectedMovie.title}
                          onChange={(e) =>
                            setSelectedMovie({
                              ...selectedMovie,
                              title: e.target.value,
                            })
                          }
                        />
                        <TextField
                          fullWidth
                          required
                          margin="dense"
                          label="Movie Description"
                          value={selectedMovie.description}
                          onChange={(e) =>
                            setSelectedMovie({
                              ...selectedMovie,
                              description: e.target.value,
                            })
                          }
                        />
                        <FormControl fullWidth required margin="dense">
                          <InputLabel>Category</InputLabel>
                          <Select
                            value={selectedMovie.category_id}
                            onChange={(e) =>
                              setSelectedMovie({
                                ...selectedMovie,
                                category_id: e.target.value,
                              })
                            }
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
                        <FormControl fullWidth required margin="dense">
                          <InputLabel>Actors</InputLabel>
                          <Select
                            value={selectedMovie.actor_id}
                            onChange={(e) =>
                              setSelectedMovie({
                                ...selectedMovie,
                                actor_id: e.target.value,
                              })
                            }
                            sx={{ textAlign: "start" }}
                          >
                            <MenuItem value="">
                              <em>Select Actor</em>
                            </MenuItem>
                            {actors.map((actor) => (
                              <MenuItem key={actor.id} value={actor.id}>
                                {actor.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Button
                          component="label"
                          role={undefined}
                          variant="outlined"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          {fileName ? fileName : selectedMovie.image}
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            multiple
                          />
                        </Button>
                      </Box>
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
              {/* Delete Movie Dialog */}
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
                    onClick={handleDeleteMovie}
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
