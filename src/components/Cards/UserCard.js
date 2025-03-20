import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
/////////////////////////////////////////////////
import React from "react";
import { Link } from "react-router-dom";
/////////////////////////////////////////////////

const UserCard = ({ actor, onDelete, onEdit }) => {
  /////////////////////////////////////////////////
  return (
    <>
      <Card
        sx={{
          maxWidth: 270,
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.7)",
          backgroundColor: "gray",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(0.95)",
            boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
          },
        }}
      >
        <>
          <Link
            to={`/SpecifcActor/${actor.id}`}
            style={{ textDecoration: "none" }}
          >
            <Box display="flex" justifyContent="center" mt={2}>
              <Avatar
                alt="star"
                src="/images/actorCard.png"
                sx={{ width: 150, height: 150, border: "2px solid white" }}
              />
            </Box>

            <CardContent sx={{ backgroundColor: "gray" }}>
              <Typography variant="h5" component="div" align="center">
                {actor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                BirthDate: {actor.birthdate}
              </Typography>
            </CardContent>
          </Link>
        </>
        <Box display="flex" justifyContent="space-between" padding="8px">
          <IconButton color="third" onClick={() => onDelete(actor.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="third" onClick={() => onEdit(actor)}>
            <EditIcon />
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default UserCard;
