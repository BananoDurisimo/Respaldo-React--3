import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";

const Content = () => (
  <>
    <style>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0);    }
      }
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px);   }
        50%       { transform: translateY(-14px); }
      }
      @keyframes pulse-ring {
        0%   { transform: scale(0.92); opacity: 0.6; }
        100% { transform: scale(1.4);  opacity: 0;   }
      }

      .hero-title {
        animation: fadeUp 0.8s cubic-bezier(.22,.68,0,1.2) 0.1s both;
      }
      .hero-sub {
        animation: fadeUp 0.8s cubic-bezier(.22,.68,0,1.2) 0.28s both;
      }
      .hero-cta {
        animation: fadeUp 0.8s cubic-bezier(.22,.68,0,1.2) 0.44s both;
      }
      .hero-badge {
        animation: fadeUp 0.8s cubic-bezier(.22,.68,0,1.2) 0.58s both;
      }
      .floating-blob {
        animation: float 7s ease-in-out infinite;
      }
      .gradient-text {
        background: linear-gradient(90deg, #fff 20%, #888 50%, #fff 80%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }
      .cta-btn:hover .arrow-icon {
        transform: translateX(5px);
      }
      .arrow-icon {
        transition: transform 0.25s ease;
      }
    `}</style>

    <Box
      sx={{
        position: "relative",
        minHeight: "77.3vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
        overflow: "hidden",
        background: "#080808"
      }}
    >
      {/* ── Blobs decorativos ── */}
      <Box
        className="floating-blob"
        sx={{
          position: "absolute",
          top: "10%",
          left: "8%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none"
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "6%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          animation: "float 9s ease-in-out infinite reverse"
        }}
      />

      {/* Grid de puntos de fondo */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          pointerEvents: "none",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)"
        }}
      />

      {/* ── Badge superior ── */}
      <Box
        className="hero-badge"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          px: 2,
          py: 0.8,
          borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)"
        }}
      >
        {/* Punto pulsante */}
        <Box sx={{ position: "relative", width: 8, height: 8 }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#4ade80",
              animation: "pulse-ring 1.6s ease-out infinite"
            }}
          />
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
        </Box>
        <Typography
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.1em",
            textTransform: "uppercase"
          }}
        >
          Tecnología de última generación
        </Typography>
      </Box>

      {/* ── Título ── */}
      <Typography
        className="hero-title"
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem" },
          lineHeight: 1.0,
          letterSpacing: "-0.04em",
          mb: 3,
          maxWidth: 860
        }}
      >
        <Box component="span" className="gradient-text">
          Bienvenido
        </Box>
        <br />
        <Box component="span" sx={{ color: "rgba(255,255,255,0.15)", fontSize: "0.55em", letterSpacing: "0.08em", fontWeight: 700 }}>
          AL FUTURO DIGITAL
        </Box>
      </Typography>

      {/* ── Descripción ── */}
      <Typography
        className="hero-sub"
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: { xs: "0.9rem", md: "1.05rem" },
          maxWidth: 520,
          color: "rgba(255,255,255,0.45)",
          mb: 5,
          lineHeight: 1.75,
          letterSpacing: "0.01em"
        }}
      >
        Dispositivos innovadores, accesorios esenciales y tecnología confiable
        al mejor precio. Encuentra el equipo perfecto para trabajar, estudiar
        y mantenerte conectado.
      </Typography>

      {/* ── CTA ── */}
      <Box className="hero-cta" sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "stretch", sm: "center" }, width: { xs: "100%", sm: "auto" }, maxWidth: { xs: 360, sm: "none" }, px: { xs: 1, sm: 0 } }}>
        <Button
          component={NavLink}
          to="/Articulos"
          className="cta-btn"
          size="large"
          endIcon={<ArrowForwardIcon className="arrow-icon" sx={{ fontSize: "18px !important" }} />}
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#080808",
            background: "#fff",
            px: 4,
            py: 1.6,
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "0.01em",
            boxShadow: "0 0 40px rgba(255,255,255,0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "#f0f0f0",
              transform: "translateY(-3px)",
              boxShadow: "0 12px 40px rgba(255,255,255,0.2)"
            }
          }}
        >
          Ver Artículos
        </Button>

        <Button
          component={NavLink}
          to="/Ofertas"
          size="large"
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.6)",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.12)",
            px: 4,
            py: 1.6,
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "0.9rem",
            fontWeight: 500,
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#fff",
              borderColor: "rgba(255,255,255,0.35)",
              background: "rgba(255,255,255,0.05)",
              transform: "translateY(-3px)"
            }
          }}
        >
          Ver Ofertas
        </Button>

        <Button
          component="a"
          href="https://github.com/BananoDurisimo/Taller-N-3_React"
          target="_blank"
          rel="noopener noreferrer"
          size="large"
          startIcon={<GitHubIcon />}
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#080808",
            background: "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
            border: "1px solid rgba(255,255,255,0.2)",
            px: 4,
            py: 1.6,
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "0.01em",
            boxShadow: "0 0 30px rgba(255,255,255,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #fff, #e2e8f0)",
              transform: "translateY(-3px)",
              boxShadow: "0 12px 40px rgba(255,255,255,0.2)"
            }
          }}
        >
          Ver en GitHub
        </Button>
      </Box>

      {/* ── Línea divisora inferior ── */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)"
        }}
      />
    </Box>
  </>
);

export default Content;
