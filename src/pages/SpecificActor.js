import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//////////////////////////////////////////////////
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../services/axios";

//////////////////////////////////////////////////
function SpecifcActor() {
  //////////////////////////////////////////////////
  //Initializing
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  //////////////////////////////////////////////////
  //fetching
  useEffect(() => {
    const FetchActors = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/actors"
        );
        console.log("Actors API", response.data);
        setActors(response.data);
      } catch (error) {
        console.log(error);
        console.log("failed fetching Actors", error);
        alert(
          "There is Problem in Fetching Actors From Server , Please Try Later :("
        );
      }
    };
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/movies"
        );

        console.log("Movies API", response.data.data);
        setMovies(response.data.data);
      } catch (error) {
        console.log(error);
        console.log("failed fetching Movies", error);
        alert(
          "There is Problem in Fetching Movies From Server , Please Try Later :("
        );
      }
    };
    fetchMovies();
    FetchActors();
  }, []);
  //////////////////////////////////////////////////
  //Geting Actor Details : Actor Name , Movies ....
  //Finding The Actor By Id To Get The Actor Name , Birthdate
  const actor = actors.find((actor) => actor.id === parseInt(id));
  if (actor === undefined) {
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
  console.log("Fetched Actor", actor);
  console.log("Actor Name", actor.name);
  //Finding The Movie By Id To Get The Movies Titles By Actor
  const movieTitles = movies.filter((movie) => movie.actor_id === actor.id);
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
            height: "100vh",
          }}
        >
          {/* طبقة السواد */}

          <Container maxWidth="lg" sx={{ padding: "16px" }}>
            <Grid container spacing={4}>
              {/*//////////////////////////////////////////////////*/}
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card sx={{ height: "100%" }}>
                  {/*//////////////////////////////////////////////////*/}
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h4" component="div" gutterBottom>
                        {actor.name}
                      </Typography>
                      <Avatar
                        alt="star"
                        src="/images/actorCard.png"
                        sx={{
                          width: 70,
                          height: 70,
                          border: "2px solid white",
                        }}
                      />
                    </Box>
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
                          {actor.created_at.slice(0, 19)}
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
                          {actor.updated_at.slice(0, 19)}
                        </Typography>
                      </Box>
                      <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "start",
                        }}
                      >
                        <TodayIcon fontSize="small" />
                        <Typography
                          variant="h6"
                          component="div"
                          gutterBottom
                          sx={{ fontWeight: "bold" }}
                        >
                          Birthdate:
                        </Typography>
                      </Box>
                      <Typography variant="body1">{actor.birthdate}</Typography>
                      <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "start",
                        }}
                      >
                        <LocalMoviesIcon fontSize="small" />
                        <Typography
                          variant="h6"
                          component="div"
                          gutterBottom
                          sx={{ fontWeight: "bold" }}
                        >
                          Movies:
                        </Typography>
                      </Box>
                      <Typography variant="body1">
                        {movieTitles.length > 0 ? (
                          movieTitles.map((movie) => (
                            <Chip
                              key={movie.id}
                              label={movie ? movie.title : "Loading..."}
                              sx={{ margin: 0.5 }}
                            />
                          ))
                        ) : (
                          <Typography sx={{ color: "red" }}>
                            No Movie Has This Actor Yet :(
                          </Typography>
                        )}
                      </Typography>
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

export default SpecifcActor;
