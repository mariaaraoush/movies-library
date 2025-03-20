import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
/////////////////////////////////////////////////
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../services/axios";
import CustomSnackbar from "./CustomSnackbar";
/////////////////////////////////////////////////
import React from "react";
/////////////////////////////////////////////////
const WishList = () => {
  /////////////////////////////////////////////////
  //Initializing
  const [movies, setMovies] = useState([]);
  const [openWishlistDelete, setOpenWishlistDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  /////////////////////////////////////////////////
  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/get-wishlist"
        );
        setMovies(response.data.data);
      } catch (error) {
        console.log("failed fetching Wishlist", error);
        alert(
          "There is Problem in Fetching Wishlist From Server , Please Try Later :("
        );
      } finally {
        setLoading(false);
      }
    };
    fetchWishList();
  }, []);
  /////////////////////////////////////////////////
  const fetchWishList = async () => {
    try {
      const response = await axiosInstance.get(
        "http://testing.abi-edu.net/api/get-wishlist"
      );
      console.log("whishlist", response.data.data);
      setMovies(response.data.data);
    } catch (error) {
      console.log("failed fetching Wishlist", error);
      alert(
        "There is Problem in Fetching Wishlist From Server , Please Try Later :("
      );
    } finally {
      setLoading(false);
    }
  };
  /////////////////////////////////////////////////
  const handleWishListDelete = async () => {
    if (selectedMovieId) {
      setLoadingButton(true);
      try {
        await axiosInstance.delete(
          `http://testing.abi-edu.net/api/delete-from-wishlist/${selectedMovieId}`
        );
        console.log("wishlist deleting success");
        fetchWishList();
        setLoadingButton(false);
        setOpenWishlistDelete(false);
        setOpenSnack(true);
      } catch (error) {
        console.error("Error deleting movie from wishlist:", error);
        alert(
          "There is Problem in Deleting Movie From WishList, Please Try Later :("
        );
      }
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
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
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
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Card
                      sx={{
                        height: "355px",
                        maxWidth: 400,
                        mr: 2,
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
                        },
                      }}
                    >
                      <Link
                        to={`/SpecifcMovie/${movie.id}`}
                        style={{
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {" "}
                        <CardMedia
                          component="img"
                          alt="img"
                          image="/images/filmCard.png"
                          height="150"
                          sx={{ width: "150", objectFit: "cover" }}
                        />
                      </Link>
                      <CardContent>
                        <Typography
                          variant="h5"
                          component="div"
                          gutterBottom
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 1,
                          }}
                        >
                          {movie.title}
                        </Typography>
                        <Typography
                          variant="body2"
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
                        <Link
                          to={`/SpecifcMovie/${movie.id}`}
                          style={{
                            textDecoration: "none",
                            marginTop: "8px",
                            display: "block",
                          }}
                        >
                          <Typography variant="body2" color="primary">
                            more...
                          </Typography>
                        </Link>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          color="gray"
                          aria-label="remove from wishlist"
                          onClick={() => {
                            setSelectedMovieId(movie.id);
                            setOpenWishlistDelete(true);
                          }}
                        >
                          <HeartBrokenIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                    {/* Delete From WishList Dialog */}
                    <Dialog
                      open={openWishlistDelete}
                      onClose={() => setOpenWishlistDelete(false)}
                      fullWidth
                      maxWidth="sm"
                    >
                      <DialogTitle>Are You Sure....?</DialogTitle>
                      <DialogContent>
                        You Want To Delete This Item From Wishlist ?
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setOpenWishlistDelete(false)}
                          sx={{ color: "black" }}
                        >
                          No
                        </Button>
                        <Button
                          onClick={handleWishListDelete}
                          loading={loadingButton}
                          loadingPosition="end"
                          sx={{ color: "black" }}
                        >
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                ))
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ color: "white" }}>
                    No Movies In WishList Yet :(
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Grid>
      </Container>
      <CustomSnackbar
        open={openSnack}
        handleClose={handleCloseSnack}
        message="Operation Done Successfully!"
        color="success" // "error", "warning", "info", "success"
      />
    </>
  );
};

export default WishList;
