import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  styled,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import CategoryIcon from "@mui/icons-material/Category";
/////////////////////////////////////////////////
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RateDialog from "../RateDialog";
import axiosInstance from "../../services/axios";
import CustomSnackbar from "../CustomSnackbar";
/////////////////////////////////////////////////

const StyledCard = styled(Card)({
  width: "275px",
  borderRadius: "16px",
  backgroundColor: "gray",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.7)",
});
/////////////////////////////////////////////////
const Screen = styled(CardMedia)({
  height: "150px",
  position: "relative",
});
/////////////////////////////////////////////////
const PlayButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  zIndex: 1,
});
/////////////////////////////////////////////////

const AllMovies = ({ movie }) => {
  /////////////////////////////////////////////////
  //Initializing
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [actors, setActors] = useState([]);
  const [ratedList, setRatedList] = useState([]);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [wishList, setWishList] = useState([]);
  /////////////////////////////////////////////////
  //fetching
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("failed fetching Categories", error);
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
        console.error("failed fetching Actors", error);
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
        setRatedList(response.data.data);
      } catch (error) {
        console.error("failed fetching Rated Movies", error);
        alert(
          "There is Problem in Fetching Rated Movies From Server , Please Try Later :("
        );
      }
    };

    const fetchWishList = async () => {
      try {
        const response = await axiosInstance.get(
          "http://testing.abi-edu.net/api/get-wishlist"
        );
        console.log("wished list", response.data.data);
        setWishList(response.data.data);
      } catch (error) {
        console.error("failed fetching WishList", error);
        alert(
          "There is Problem in Fetching WishList From Server , Please Try Later :("
        );
      }
    };
    fetchCategories();
    fetchActors();
    fetchRatings();
    fetchWishList();
  }, [ratedList.length, wishList.length]);
  ////////////////////////////////////////
  //Geting Movie Details : Category Name , Actor Name , Rating , Is In WishList
  //Finding The Category By Id To Get The Category Name
  const filmCategory = categories.find(
    (category) => category.id === movie.category_id
  );
  //Finding The Actor By Id To Get The Actor Name
  const filmActors = actors.filter((actor) => actor.id === movie.actor_id);
  //Get Rating
  const filmRating = ratedList.filter((rating) => rating.movie_id === movie.id);
  //Check If It Is Alrady Rated To Change Icon
  const inRatedList = ratedList.find(
    (element) => element.movie_id === movie.id
  );
  //Check If It Is Already In WishList To Change Icon And Avoid Adding It Again
  const inWishList = wishList.find((element) => element.id === movie.id);

  /////////////////////////////////////////////////
  //Add To WishList
  const handleWishList = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.get(
        `http://testing.abi-edu.net/api/add-to-wishlist/${movie.id}`
      );
      console.log("wishlist success");
      setLoading(false);
      setOpenWishlist(false);
      setOpenSnack(true);
    } catch (error) {
      console.error("Error adding movie to wishlist:", error);
      alert("There is Problem in Adding to WishList , Please Try Later :(");
      setLoading(false);
    }
  };
  /////////////////////////////////////////////////
  //Open Rating Dialog And Closing It
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /////////////////////////////////////////////////
  // SnackBar For Confirmation
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  /////////////////////////////////////////////////
  return (
    <>
      <StyledCard
        sx={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(0.95)",
            boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
          },
        }}
      >
        <Screen image="/images/filmCard.png" title="popcorn">
          {/*<Screen image={movie.image} title={movie.title}>*/}
          <Link to={`/SpecifcMovie/${movie.id}`}>
            <PlayButton>
              <PlayArrowIcon fontSize="large" />
            </PlayButton>
          </Link>
        </Screen>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <Typography variant="h5" color="black">
              {movie.title}
            </Typography>
          </Box>
          {filmRating.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}
            >
              <StarRateIcon fontSize="small" />
              <Typography
                variant="caption"
                sx={{ fontSize: "small", color: "black" }}
              >
                {filmRating.map((rating) => rating.rate)}
                /5
              </Typography>
            </Box>
          ) : (
            ""
          )}
          {filmCategory ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}
            >
              <CategoryIcon fontSize="small" />
              <Typography variant="caption" color="black">
                {filmCategory.name}
              </Typography>
            </Box>
          ) : (
            ""
          )}
          {filmActors.length > 0 ? (
            <Typography variant="caption" color="black">
              {/*  <RecentActorsIcon fontSize="small" /> */}
              {filmActors.map((actor) => (
                <Chip key={actor.id} label={actor.name} sx={{ margin: 0.5 }} />
              ))}
            </Typography>
          ) : (
            ""
          )}
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
          <Link
            to={`/SpecifcMovie/${movie.id}`}
            style={{
              textDecoration: "none",
              marginTop: "4px",
              display: "block",
            }}
          >
            <Typography variant="body2" color="third">
              more...
            </Typography>
          </Link>
        </CardContent>
        <Box display="flex" justifyContent="space-between">
          {inRatedList ? (
            <IconButton sx={{ color: "yellow" }}>
              <StarIcon />
            </IconButton>
          ) : (
            <IconButton sx={{ color: "yellow" }} onClick={handleClickOpen}>
              <StarBorderIcon />
            </IconButton>
          )}
          {inWishList ? (
            <IconButton color="primary">
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton color="primary">
              <FavoriteBorderIcon onClick={() => setOpenWishlist(true)} />
            </IconButton>
          )}
          <RateDialog open={open} onClose={handleClose} movie={movie} />
        </Box>
        {/* Add To WishList Dialog */}
        <Dialog
          open={openWishlist}
          onClose={() => setOpenWishlist(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are You Sure....?</DialogTitle>
          <DialogContent>You Want To Add This Item To Wishlist ?</DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenWishlist(false)}
              sx={{ color: "black" }}
            >
              No
            </Button>
            <Button
              loading={loading}
              loadingPosition="end"
              onClick={handleWishList}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        {/* SnackBar Confirmation */}
        <CustomSnackbar
          open={openSnack}
          handleClose={handleCloseSnack}
          message="Added To WishList Successfully!"
          color="success" // "error", "warning", "info", "success"
        />
      </StyledCard>
    </>
  );
};

export default AllMovies;
