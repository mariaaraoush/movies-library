import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery, Card, CardMedia, CardContent } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MovieIcon from "@mui/icons-material/Movie";
/////////////////////////////////////////////////
import RegisterHeader from "../sections/RegisterHeader";
import Footer from "../sections/Footer";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
//import axiosInstance from "../services/axios";
import axios from "axios";

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
export default function Home() {
  /////////////////////////////////////////////////
  //Initializing
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  /////////////////////////////////////////////////
  const isLargeOrDown = useMediaQuery(theme.breakpoints.down("lg"));
  /////////////////////////////////////////////////
  //Fetching
  useEffect(() => {
    const FetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://testing.abi-edu.net/api/movies"
        );
        console.log("Movies API Without Auth", response.data.data);
        setMovies(response.data.data);
      } catch (error) {
        console.error("failed fetching Movies", error);
        alert(
          "There is Problem in Fetching Movies From Server , Please Try Later :("
        );
      } finally {
        setLoading(false);
      }
    };

    FetchMovies();
  }, []);
  /////////////////////////////////////////////////
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: 'url("/images/main.png")',
          backgroundSize: "fit",
          backgroundPosition: "center",
          height: "fit",
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
        <RegisterHeader />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 1,
            marginTop: "8%",
            margin: "5px",
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
              width: "50%",
              textAlign: "center",
              color: "white",
              padding: "18px",
              marginBottom: "1%",
              marginTop: "5%",
            }}
          >
            Join Us And Let Your Dreams Unfold On The Screen With Dreamflix!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Slider />
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
                  <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                    <CircularProgress color="main" />
                  </Stack>
                  <Typography sx={{ color: "white" }}>
                    please be patient :)
                  </Typography>
                </Box>
              ) : (
                <>
                  {movies.map((movie, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                      <Card
                        sx={{
                          marginLeft: "8px",
                          width: "300px",
                          borderRadius: "16px",
                          backgroundColor: "gray",
                          position: "relative",
                          overflow: "hidden",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.7)",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "scale(0.97)",
                            boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
                          },
                        }}
                      >
                        <CardMedia
                          image="/images/filmCard.png"
                          title={movie.title}
                          sx={{ height: "150px", position: "relative" }}
                        ></CardMedia>
                        <CardContent>
                          {" "}
                          <Typography variant="h5" color="black">
                            {movie.title}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "start",
                            }}
                          >
                            <MovieIcon fontSize="small" />
                            <Typography
                              variant="caption"
                              sx={{
                                color: "black",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 3,
                              }}
                            >
                              {movie.description}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
