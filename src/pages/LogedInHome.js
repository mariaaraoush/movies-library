import Box from "@mui/material/Box";
//import { useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
/////////////////////////////////////////////////
import * as React from "react";
import { useEffect, useState } from "react";
/////////////////////////////////////////////////
import axiosInstance from "../services/axios";
/////////////////////////////////////////////////
import LogedinHeader from "../sections/LogedinHeader";
import AllMovies from "../components/Library/AllMovies";
import AllCategories from "../components/Library/AllCategories";
import AllActors from "../components/Library/AllActors";
import Footer from "../sections/Footer";
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
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
/////////////////////////////////////////////////
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
/////////////////////////////////////////////////
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
/////////////////////////////////////////////////
export default function LogedInHome() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  /////////////////////////////////////////////////
  //Show All Categories
  useEffect(() => {
    const FetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/categories"
        );
        console.log("Category API array", response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.log("Error Fetching Categories", error);
        alert(
          "There is Problem in Fetching Categories From Server , Please Try Later :("
        );
      } finally {
        setLoading(false);
      }
    };
    FetchCategories();
  }, [categories.length]);
  /////////////////////////////////////////////////
  //Show All Actors
  useEffect(() => {
    const FetchActors = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/actors"
        );
        console.log("Actors API data", response.data);
        setActors(response.data);
      } catch (error) {
        console.log("Error Fetching Actors", error);
        alert(
          "There is Problem in Fetching Actors From Server , Please Try Later :("
        );
      } finally {
        setLoading(false);
      }
    };
    FetchActors();
  }, [actors.length]);
  /////////////////////////////////////////////////
  //Show All Movies
  useEffect(() => {
    const FetchMovies = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/movies"
        );
        console.log("Movies API array", response.data.data);
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

    FetchMovies();
  }, [movies.length]);
  /////////////////////////////////////////////////
  //For Tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /////////////////////////////////////////////////
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: 'url("/images/main.png")',
          backgroundSize: "fit",
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
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                position: "sticky",
                top: 63,
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                zIndex: 2,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="All Movies"
                  {...a11yProps(0)}
                  sx={{ color: "white" }}
                />
                <Tab
                  label=" All Categories"
                  {...a11yProps(1)}
                  sx={{ color: "white" }}
                />
                <Tab
                  label=" All Actors"
                  {...a11yProps(2)}
                  sx={{ color: "white" }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
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
                        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                          <AllMovies movie={movie} />
                        </Grid>
                      ))
                    ) : (
                      <Typography sx={{ color: "white" }}>
                        No Movies In Library Yet :(
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
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
                      categories.map((category, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                          <AllCategories category={category} />
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
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
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
                    {actors.length > 0 ? (
                      actors.map((actor, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                          <AllActors actor={actor} />
                        </Grid>
                      ))
                    ) : (
                      <Typography sx={{ color: "white" }}>
                        No Actors In Library Yet :(
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
            </CustomTabPanel>
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
