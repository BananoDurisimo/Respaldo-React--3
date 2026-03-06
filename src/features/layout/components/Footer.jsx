import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');
    `}</style>

    <Box
      component="footer"
      sx={{
        background: "rgba(8,8,8,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        mt: 6
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 3, md: 5 },
          py: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.2
        }}
      >
        <Typography
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.04em"
          }}
        >
          © 2026 — Todos los derechos reservados
        </Typography>

        <Typography
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.03em"
          }}
        >
          Diseñado y desarrollado por Vicente Rios
        </Typography>
      </Box>
    </Box>
  </>
);

export default Footer;
