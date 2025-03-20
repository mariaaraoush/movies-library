import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
  Chip,
} from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import CategoryIcon from "@mui/icons-material/Category";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
//////////////////////////////////////////////////
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../services/axios";
//////////////////////////////////////////////////
function SpecifcCategory() {
  //////////////////////////////////////////////////
  //Initializing
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  //////////////////////////////////////////////////
  //fetching
  useEffect(() => {
    const FetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/categories"
        );
        console.log("Categories API", response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.log("failed fetching Categories", error);
        alert(
          "There is Problem in Fetching Categories From Server , Please Try Later :("
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
        console.log("failed fetching Movies", error);
        alert(
          "There is Problem in Fetching Movies From Server , Please Try Later :("
        );
      }
    };
    fetchMovies();
    FetchCategories();
  }, []);
  //////////////////////////////////////////////////
  //Geting Category Details : Category Name , Movies ....
  //Finding The Category By Id To Get The Category Name
  const category = categories.find((category) => category.id === parseInt(id));
  if (category === undefined) {
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
  console.log("Fetched Category", category);
  console.log("Category Name", category.name);
  //Finding The Movie By Id To Get The Movies Titles In The Category
  const movieTitles = movies.filter(
    (movie) => movie.category_id === category.id
  );
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
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
              {/*//////////////////////////////////////////////////*/}
              <Grid item xs={12} sm={12}>
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
                        {category.name}
                      </Typography>
                      <CategoryIcon fontSize="large" />
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
                          {category.created_at.slice(0, 19)}
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
                          {category.updated_at.slice(0, 19)}
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
                              label={movie.title}
                              sx={{ margin: 0.5 }}
                            />
                          ))
                        ) : (
                          <Typography sx={{ color: "red" }}>
                            No Movie in This Category Yet :(
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
export default SpecifcCategory;
