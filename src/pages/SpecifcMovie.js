import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  Box,
  Chip,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import CategoryIcon from "@mui/icons-material/Category";
import MovieIcon from "@mui/icons-material/Movie";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//////////////////////////////////////////////////
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import axiosInstance from "../services/axios";
//////////////////////////////////////////////////
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
//////////////////////////////////////////////////
function SpecifcMovie() {
  //////////////////////////////////////////////////
  //Initializing
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [actors, setActors] = useState([]);
  const [ratedList, setRatedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  //////////////////////////////////////////////////
  //fetching
  useEffect(() => {
    const fetchMovies = async () => {
      axiosInstance
        .get("http://testing.abi-edu.net/api/movies")
        .then((response) => {
          setMovies(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching Movies:", error);
          alert(
            "There is Problem in Fetching Movies From Server , Please Try Later :("
          );
          setError(error);
          setLoading(false);
        });
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.log("failed fetching Categories", error);
        alert(
          "There is Problem in Fetching Categories From Server , Please Try Later :("
        );
      }
    };

    const fetchActors = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/actors"
        );
        setActors(response.data);
      } catch (error) {
        console.log("failed fetching Actors", error);
        alert(
          "There is Problem in Fetching Actors From Server , Please Try Later :("
        );
      }
    };

    const fetchRatings = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/getRatedMovies"
        );
        console.log("rated list", response.data.data);
        setRatedList(response.data.data);
      } catch (error) {
        console.log("failed fetching Rated Movies", error);
        alert(
          "There is Problem in Fetching Rated Movies From Server , Please Try Later :("
        );
      }
    };
    fetchMovies();
    fetchCategories();
    fetchActors();
    fetchRatings();
  }, [categories.length, actors.length, ratedList.length]);
  //////////////////////////////////////////////////
  //Geting Movie Details : Category Name , Actors ....
  //Finding The Movie By Id To Get The Movie Details
  if (error) return <div>Error fetching data: {error.message}</div>;
  const movie = movies.find((movie) => movie.id === parseInt(id));
  if (loading && movie === undefined) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress color="main" />
        </Stack>
      </Box>
    );
  }
  //////////////////////////////////////////////////
  //Finding The Category By Id To Get The Category Name
  const filmCategory = categories.find(
    (category) => category.id === movie.category_id
  );
  //Finding The Actor By Id To Get The Actor Name
  const filmActors = actors.filter((actor) => actor.id === movie.actor_id);
  //Get Rating
  const filmRating = ratedList.filter((rating) => rating.movie_id === movie.id);
  //////////////////////////////////////////////////
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
  //////////////////////////////////////////////////
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "darkgray",
            height: "fit-content",
          }}
        >
          {/* طبقة السواد */}

          <Container maxWidth="lg" sx={{ mt: 4, paddingBottom: "50px" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="img"
                    height="400"
                    /* image={movie.image} */
                    image="/images/filmCard.png"
                    sx={{ objectFit: "cover" }}
                  />
                </Card>
              </Grid>
              {/*//////////////////////////////////////////////////*/}
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: "100%" }}>
                  {/*//////////////////////////////////////////////////*/}
                  <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                      {movie.title}
                    </Typography>

                    <Box mt={2}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                          }}
                        >
                          <CalendarMonthIcon fontSize="small" />
                          <Typography
                            variant="h6"
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                          >
                            Created At:
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "small", color: "black" }}
                          component="div"
                        >
                          {" "}
                          {movie.created_at.slice(0, 19)}
                        </Typography>
                      </Box>
                      <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                          }}
                        >
                          <EditCalendarIcon fontSize="small" />
                          <Typography
                            variant="h6"
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                          >
                            Last update:
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ fontSize: "small", color: "black" }}
                          component="div"
                        >
                          {" "}
                          {movie.updated_at.slice(0, 19)}
                        </Typography>
                      </Box>
                      <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                          }}
                        >
                          <StarRateIcon fontSize="small" />
                          <Typography
                            variant="h6"
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                          >
                            Average Ratings:
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ fontSize: "medium" }}
                        >
                          {filmRating.length > 0 ? (
                            <Typography>
                              {filmRating.map((rating) => rating.rate)}
                              /5
                            </Typography>
                          ) : (
                            <Typography sx={{ color: "red" }}>
                              Not Available Yet...
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                      <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                          }}
                        >
                          <CategoryIcon fontSize="small" />
                          <Typography
                            variant="h6"
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                          >
                            Category:
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {filmCategory ? (
                            filmCategory.name
                          ) : (
                            <Typography sx={{ color: "red" }}>
                              Not Available Yet...
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                      <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                          }}
                        >
                          <RecentActorsIcon fontSize="small" />
                          <Typography
                            variant="h6"
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                          >
                            Actors:
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {filmActors.length > 0 ? (
                            filmActors.map((actor) => (
                              <Chip
                                key={actor.id}
                                label={actor.name}
                                sx={{ margin: 0.5 }}
                              />
                            ))
                          ) : (
                            <Typography sx={{ color: "red" }}>
                              Not Available Yet...
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                      <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                          }}
                        >
                          <MovieIcon fontSize="small" />
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                          >
                            About This Movie:
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {movie.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  {/*//////////////////////////////////////////////////*/}
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default SpecifcMovie;
