import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//////////////////////////////////////////////////
import React from "react";
import { NavLink } from "react-router";
//import { useState } from "react";
//////////////////////////////////////////////////
import "../styles/Header.css";
//////////////////////////////////////////////////
export default function LogedinHeader() {
  //////////////////////////////////////////////////
  const links = [
    { url: "/Home", name: "Library" },
    { url: "/Category", name: "Categories" },
    { url: "/Actor", name: "Actors" },
    { url: "/Movie", name: "Movies" },
    { url: "/Lists", name: "WishList" },
  ];
  //////////////////////////////////////////////////
  const settings = [{ url: "/", name: "Logout" }];
  //////////////////////////////////////////////////
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  //////////////////////////////////////////////////
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  //////////////////////////////////////////////////
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //////////////////////////////////////////////////
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
  //////////////////////////////////////////////////
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(255, 0, 150, 0))",
          color: "#FF0055",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* //////////////////////////////menue/////////////////////////// */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {links.map((link, index) => (
                  <MenuItem key={index} className="my-menu">
                    <NavLink
                      to={link.url}
                      key={link.name}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontFamily: "Sawarabi Gothic",
                        }}
                        className="headerItems"
                      >
                        {link.name}
                      </Typography>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* ////////////////////////////bar//////////////////////////// */}

            <Typography
              variant="h4"
              component="div"
              sx={{
                color: "whitesmoke",
                fontWeight: "bold",
                fontFamily: "Montserrat",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  color: "#FF0055",
                  cursor: "default",
                  boxShadow: "0px 4px 20px rgba(255, 0, 85, 0.5)",
                },
              }}
            >
              DreamFlix
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {links.map((link, index) => (
                <NavLink
                  to={link.url}
                  key={link.name}
                  style={{ textDecoration: "none" }}
                  onClick={handleCloseNavMenu}
                >
                  <Typography
                    sx={{
                      mr: 2,
                      textAlign: "center",
                      fontFamily: "Roboto",
                    }}
                    className="headerItems"
                  >
                    {link.name}
                  </Typography>{" "}
                </NavLink>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt=":)" src="/images/userIcon.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleCloseUserMenu}
                    className="my-menu"
                  >
                    <NavLink
                      to={setting.url}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.name}
                      </Typography>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
