import { Box, Card, CardContent, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
/////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
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
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});
/////////////////////////////////////////////////
const cardsContent = [
  { img: "/images/category.png", text: "Add Your Favorite Category" },
  { img: "/images/actors.png", text: "Add Your Favorite Actor" },
  { img: "/images/films.png", text: "Add Your Favorite Movie" },
  { img: "/images/popcorn.png", text: "Browse Your WishList :)" },
];
/////////////////////////////////////////////////
export default function Slider() {
  /////////////////////////////////////////////////
  const [currentIndex, setCurrentIndex] = useState(0);
  /////////////////////////////////////////////////
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsContent.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  /////////////////////////////////////////////////
  const isLargeOrDown = useMediaQuery(theme.breakpoints.down("lg"));
  /////////////////////////////////////////////////
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "row",
          backgroundColor: "transparent",
          marginBottom: "20px",
          zIndex: 1,
        }}
      >
        {cardsContent.map((content, index) => (
          <Card
            key={index}
            width={isLargeOrDown ? "40px" : "200px"}
            sx={{
              opacity: index === currentIndex ? 1 : 0,
              boxShadow: "0px 4px 15px rgba(255, 0, 85, 0.8)",
              backgroundColor: "#1A1A1A",
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <CardMedia
              component="img"
              height="100"
              image={content.img}
              alt="green iguana"
            />
            <CardContent>
              <Typography
                variant={isLargeOrDown ? "caption" : "h5"}
                textAlign={isLargeOrDown ? "center" : "start"}
                sx={{
                  color: "whitesmoke",
                  fontFamily: "Montserrat",
                }}
              >
                {content.text}
              </Typography>
            </CardContent>
            <ArrowForward style={{ color: "#FF0055" }} />
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
}
