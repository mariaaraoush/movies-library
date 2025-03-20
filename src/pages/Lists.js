import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/////////////////////////////////////////////////
import * as React from "react";
/////////////////////////////////////////////////
import LogedinHeader from "../sections/LogedinHeader";
import WishList from "../components/WishList";
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

export default function Lists() {
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
            <WishList />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}
