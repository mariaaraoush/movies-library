import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
/////////////////////////////////////////////////
import ActorForm from "../components/Actors CRUD/ActorForm";
import LogedinHeader from "../sections/LogedinHeader";
import CustomSnackbar from "../components/CustomSnackbar";
import UserCard from "../components/Cards/UserCard";
import Footer from "../sections/Footer";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
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

export default function Actor() {
  /////////////////////////////////////////////////
  //Initializing
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentActorId, setCurrentActorId] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedActor, setSelectedActor] = useState({
    id: "",
    name: "",
    birthdate: "",
  });
  /////////////////////////////////////////////////
  const isLargeOrDown = useMediaQuery(theme.breakpoints.down("lg"));
  /////////////////////////////////////////////////
  //fetching For The First Time
  useEffect(() => {
    fetchActors();
  }, [actors.length]);
  /////////////////////////////////////////////////
  //fetching
  const fetchActors = async () => {
    try {
      const response = await axiosInstance.get(
        "http://testing.abi-edu.net/api/actors"
      );
      console.log("Actors API", response.data);
      setActors(response.data);
    } catch (error) {
      console.error("failed fetching Actors", error);
      alert(
        "There is Problem in Fetching Actors From Server , Please Try Later :("
      );
    } finally {
      setLoading(false);
    }
  };
  /////////////////////////////////////////////////
  const handleDeleteActor = async (id) => {
    setLoadingButton(true);
    try {
      await axiosInstance.delete(
        `http://testing.abi-edu.net/api/actors/${currentActorId}`
      );
      console.log("deleting actor success");
      fetchActors();
      setLoadingButton(false);
      setOpenDelete(false);
      setOpenSnack(true);
    } catch (error) {
      console.error("Error deleting actor:", error);
      alert(
        "There is Problem in deleting Actor From Server , Please Try Later :("
      );
      setLoadingButton(false);
    }
  };
  /////////////////////////////////////////////////
  //Updating Actor
  const handleSave = () => {
    setLoadingButton(true);
    console.log("selected id", selectedActor.id);
    console.log("selected name after Editing", selectedActor.name);
    axiosInstance
      .post(`http://testing.abi-edu.net/api/actors/${selectedActor.id}`, {
        _method: "PUT",
        name: selectedActor.name,
        birthdate: selectedActor.birthdate,
      })
      .then((response) => {
        setActors(
          actors.map((actor) =>
            actor.id === selectedActor.id ? response.data : actor
          )
        );
        console.log("Updating Actor Success", response.data);
        fetchActors();
        setLoadingButton(false);
        setOpen(false);
        setOpenSnack(true);
      })
      .catch((error) => {
        console.error("Error updating actor:", error);
        alert(
          "There is Problem in Updating Actor From Server , Please Try Later :("
        );
        setLoadingButton(false);
      });
  };
  /////////////////////////////////////////////////
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  /////////////////////////////////////////////////
  //Close Updating Dialog
  const handleClose = () => {
    setOpen(false);
  };
  /////////////////////////////////////////////////
  return (
    <>
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
                Add Your Favourite Actors
              </Typography>
              <ActorForm />
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
                    {actors.length > 0 ? (
                      actors.map((actor, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <UserCard
                            actor={actor}
                            onDelete={() => {
                              setCurrentActorId(actor.id);
                              setOpenDelete(true);
                            }}
                            onEdit={(actor) => {
                              setCurrentActorId(actor.id);
                              setSelectedActor(actor);
                              setOpen(true);
                            }}
                          />
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
              {/* ///////////////////////////////////////////////// */}
              {/* Edit Actor Dialog */}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                  sx={{ fontFamily: "Montserrat", fontWeight: "bolder" }}
                >
                  Edit Actor
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
                          label="Actor Name"
                          value={selectedActor.name}
                          onChange={(e) =>
                            setSelectedActor({
                              ...selectedActor,
                              name: e.target.value,
                            })
                          }
                        />
                        <TextField
                          fullWidth
                          required
                          margin="dense"
                          type="Date"
                          label="Actor BirthDate"
                          value={selectedActor.birthdate}
                          onChange={(e) =>
                            setSelectedActor({
                              ...selectedActor,
                              birthdate: e.target.value,
                            })
                          }
                        />
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
              {/* Delete Actor Dialog */}
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
                    onClick={handleDeleteActor}
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
        {/* Confirmation */}
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
