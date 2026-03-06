import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/",             label: "Inicio"    },
  { path: "/Articulos",    label: "Artículos" },
  { path: "/Ofertas",      label: "Ofertas"   },
  { path: "/Micuenta",     label: "Mi Cuenta" },
  { path: "/Misfavoritos", label: "Favoritos" }
];

const Header = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

      .nav-link {
        position: relative;
        text-decoration: none;
        color: rgba(255,255,255,0.6);
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 6px 0;
        transition: color 0.25s ease;
      }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 1.5px;
        background: #fff;
        transition: width 0.3s cubic-bezier(.22,.68,0,1.2);
      }
      .nav-link:hover { color: #fff; }
      .nav-link:hover::after,
      .nav-link.active::after { width: 100%; }
      .nav-link.active { color: #fff; }
    `}</style>

    {/* ── AppBar fijo ── */}
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(8,8,8,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        top: 0,
        zIndex: 1200
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1400,
          width: "100%",
          mx: "auto",
          px: { xs: 2, md: 5 },
          py: 1.2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "64px !important"
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{
            width: 32, height: 32, borderRadius: "8px",
            background: "linear-gradient(135deg, #fff 0%, #aaa 100%)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Box sx={{ width: 14, height: 14, borderRadius: "3px", background: "#080808" }} />
          </Box>
          <Typography sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: "1.15rem",
            color: "#fff", letterSpacing: "-0.02em", lineHeight: 1
          }}>
            STOREX
          </Typography>
        </Box>

        {/* Nav links */}
        <Box
          component="nav"
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 4 }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </Box>

        {/* Acciones */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "10px", width: 40, height: 40,
            transition: "all 0.2s ease",
            "&:hover": { color: "#fff", borderColor: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)" }
          }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 19 }} />
          </IconButton>

          <IconButton sx={{
            display: { xs: "flex", md: "none" },
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "10px", width: 40, height: 40,
            transition: "all 0.2s ease",
            "&:hover": { color: "#fff", borderColor: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)" }
          }}>
            <MenuIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>

    {/* ── Espaciador para que el contenido no quede debajo del header fijo ── */}
    <Box sx={{ height: "64px" }} />
  </>
);

export default Header;
