import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//////////////////////////////////////////////////

const Footer = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1A1A1A",
      },
      secondary: {
        main: "#ffffff",
      },
    },
    typography: {
      fontFamily: "Roboto",
    },
  });
  //////////////////////////////////////////////////
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ////////////////////////////////////////////////// */}

        <div style={{ flex: 1 }}>{/*-----------------------------*/}</div>

        {/* ////////////////////////////////////////////////// */}

        <AppBar
          color="primary"
          style={{
            position: "relative",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "10px",
            boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
          }}
        >
          <Toolbar>
            <Typography
              variant="body1"
              color="inherit"
              align="center"
              style={{ flexGrow: 1 }}
              sx={{
                fontFamily: "Sawarabi Gothic",
              }}
            >
              &copy; {new Date().getFullYear()} All Right Reserved
            </Typography>
          </Toolbar>
        </AppBar>
        {/* ////////////////////////////////////////////////// */}
      </div>
    </ThemeProvider>
  );
};

export default Footer;
