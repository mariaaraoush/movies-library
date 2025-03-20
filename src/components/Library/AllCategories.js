import { Card, CardContent, Typography, Box } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
/////////////////////////////////////////////////
import React from "react";
import { Link } from "react-router-dom";
/////////////////////////////////////////////////

const AllCategories = ({ category }) => {
  return (
    <>
      <Card
        sx={{
          display: "flex",
          maxWidth: 400,
          borderRadius: "16px",
          backgroundColor: "gray",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(0.85)",
            boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
          },
        }}
      >
        <CategoryIcon fontSize="large" />
        <CardContent sx={{ flex: "1" }}>
          <Link
            to={`/SpecifcCategory/${category.id}`}
            style={{ textDecoration: "none" }}
          >
            <Typography variant="h5" component="div">
              {category.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                <CalendarMonthIcon fontSize="small" sx={{ color: "black" }} />
                {new Date(category.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                <EditCalendarIcon fontSize="small" sx={{ color: "black" }} />
                {new Date(category.updated_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default AllCategories;
