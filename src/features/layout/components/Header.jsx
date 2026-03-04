import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

const Header = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: 400,
    fontSize: "0.95rem",
    letterSpacing: "1px",
    padding: "8px 14px",
    borderBottom: "2px solid transparent",
    transition: "all 0.3s ease"
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#000",
        width: "100%"
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          px: 4
        }}
      >
        {/* Izquierda */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "2px"
            }}
          >
            
          </Typography>
        </Box>

        {/* Derecha */}
        <Box
          component="ul"
          sx={{
            display: "flex",
            gap: 3,
            listStyle: "none",
            margin: 0,
            padding: 4,
            alignItems: "center"
          }}
        >
          {[
            { path: "/", label: "INICIO" },
            { path: "/Articulos", label: "ARTÍCULOS" },
            { path: "/Ofertas", label: "OFERTAS" },
            { path: "/Micuenta", label: "MI CUENTA" },
            { path: "/Misfavoritos", label: "FAVORITOS" }
          ].map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  ...linkStyle,
                  borderBottom: isActive
                    ? "2px solid white"
                    : "2px solid transparent"
                })}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;