import React from "react";
import { Box, Typography} from "@mui/material";
import { NavLink } from "react-router-dom";

const Content = () => {
  return (
    <Box
      sx={{
        height: "77.3vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
        backgroundColor: "#f5f5f5",
        overflow: "hidden"
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 300,
          letterSpacing: "3px",
          mb: 2
        }}
      >
        BIENVENIDO
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          maxWidth: "600px",
          color: "#555",
          mb: 4
        }}
      >
        Descubre una experiencia moderna, profesional y diseñada con atención a cada detalle.
      </Typography>
    </Box>
  );
};

export default Content;