import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#000",
        mt: 6
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          py: 2
        }}
      >
        <Box textAlign="center">
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 300,
              letterSpacing: "1px",
              fontSize: "0.9rem",
              color: "white"
            }}
          >
            © 2026  — Todos los derechos reservados
          </Typography>

          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 300,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.6)",
              mt: 0.5
            }}
          >
            Diseñado y desarrollado por Vicente Rios
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;