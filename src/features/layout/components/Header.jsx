import { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, IconButton,
  Box, Badge, Drawer, List, ListItem, ListItemButton, Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCarrito } from "../../articles/hooks/CarritoContext";
import { useFavoritos } from "../../auth/hooks/FavoritosContext";

const navItemsBase = [
  { path: "/",          label: "Inicio"    },
  { path: "/Articulos", label: "Artículos" },
  { path: "/Ofertas",   label: "Ofertas"   },
];
const navItemsAuth = [
  { path: "/Misfavoritos", label: "Favoritos" },
  { path: "/Micuenta",     label: "Mi Cuenta" },
];
const navItemsGuest = [
  { path: "/Login",    label: "Login"    },
  { path: "/Registro", label: "Registro" },
];

const Header = () => {
  const { totalItems } = useCarrito();
  const { favoritos } = useFavoritos();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sesion, setSesion] = useState(() =>
    JSON.parse(localStorage.getItem("storex_sesion") || "null")
  );

  // Re-sincronizar sesión cada vez que cambia la ruta (mismo tab)
  useEffect(() => {
    setSesion(JSON.parse(localStorage.getItem("storex_sesion") || "null"));
  }, [location.pathname]);

  const navItems = [
    ...navItemsBase,
    ...(sesion ? navItemsAuth : navItemsGuest),
  ];

  const handleLogout = () => {
    localStorage.removeItem("storex_sesion");
    setSesion(null);
    navigate("/Login");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncSesion = () =>
      setSesion(JSON.parse(localStorage.getItem("storex_sesion") || "null"));
    window.addEventListener("storage", syncSesion);
    return () => window.removeEventListener("storage", syncSesion);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .nav-link {
          position: relative;
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          padding: 6px 0;
          transition: color 0.25s ease;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0%;
          height: 1.5px;
          background: linear-gradient(90deg, #fff, rgba(255,255,255,0.4));
          border-radius: 2px;
          transition: width 0.32s cubic-bezier(.22,.68,0,1.2);
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #fff; }

        .mobile-link {
          text-decoration: none;
          color: rgba(255,255,255,0.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          display: block;
          transition: color 0.2s ease;
        }
        .mobile-link:hover,
        .mobile-link.active { color: #fff; }

        @keyframes favBadgePop {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes logoShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      {/* ── AppBar ── */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? "rgba(6,6,6,0.92)"
            : "rgba(8,8,8,0.75)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.45)"
            : "none",
          transition: "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
          top: 0,
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1400,
            width: "100%",
            mx: "auto",
            px: { xs: 2.5, md: 5 },
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "68px !important",
          }}
        >
          {/* ── Logo ── */}
          <Box
            onClick={() => navigate("/")}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }}
          >
            <Box sx={{
              width: 34, height: 34, borderRadius: "9px",
              background: "linear-gradient(135deg, #ffffff 0%, #c0c0c0 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 12px rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}>
              <Box sx={{
                width: 14, height: 14, borderRadius: "3px",
                background: "#080808",
              }} />
            </Box>
            <Box>
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, fontSize: "1.18rem",
                color: "#fff", letterSpacing: "-0.02em", lineHeight: 1,
              }}>
                STOREX
              </Typography>
              <Typography sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400, fontSize: "0.58rem",
                color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em",
                textTransform: "uppercase", lineHeight: 1, mt: 0.3,
              }}>
                Tech & Lifestyle
              </Typography>
            </Box>
          </Box>

          {/* ── Nav links ── */}
          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { md: 3, lg: 4 },
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                {item.path === "/Misfavoritos" ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                    {item.label}
                    {favoritos.length > 0 && (
                      <Box sx={{
                        display: "flex", alignItems: "center", gap: 0.3,
                        background: "rgba(239,68,68,0.18)",
                        border: "1px solid rgba(239,68,68,0.35)",
                        borderRadius: "20px", px: 0.7, py: 0.15,
                        animation: "favBadgePop 0.35s cubic-bezier(.22,.68,0,1.2)",
                      }}>
                        <FavoriteIcon sx={{ fontSize: 9, color: "#ef4444" }} />
                        <Box component="span" sx={{
                          fontSize: "0.6rem", fontWeight: 800,
                          color: "#ef4444", lineHeight: 1,
                          fontFamily: "'DM Sans', sans-serif",
                        }}>
                          {favoritos.length}
                        </Box>
                      </Box>
                    )}
                  </Box>
                ) : item.label}
              </NavLink>
            ))}
          </Box>

          {/* ── Acciones ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

            {/* Saludo + logout (solo si hay sesión) */}
            {sesion && (
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.45)", fontWeight: 500,
                }}>
                  Hola, {sesion.nombre}
                </Typography>
                <Box
                  onClick={handleLogout}
                  sx={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
                    fontWeight: 600, color: "rgba(255,255,255,0.35)",
                    cursor: "pointer", letterSpacing: "0.04em",
                    "&:hover": { color: "#ef4444" },
                    transition: "color 0.2s ease",
                  }}
                >
                  Salir
                </Box>
              </Box>
            )}

            {/* Carrito */}
            <IconButton
              onClick={() => navigate("/Carrito")}
              sx={{
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px", width: 40, height: 40,
                transition: "all 0.22s ease",
                "&:hover": {
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.07)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Badge
                badgeContent={totalItems}
                max={99}
                sx={{
                  "& .MuiBadge-badge": {
                    background: "#fff",
                    color: "#080808",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.58rem",
                    minWidth: 16, height: 16,
                    padding: "0 4px",
                    border: "1.5px solid rgba(8,8,8,0.9)",
                    top: 2, right: 2,
                  },
                }}
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 19 }} />
              </Badge>
            </IconButton>

            {/* Menú móvil */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px", width: 40, height: 40,
                transition: "all 0.22s ease",
                "&:hover": {
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.07)",
                },
              }}
            >
              <MenuIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Drawer móvil ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "rgba(8,8,8,0.97)",
            backdropFilter: "blur(24px)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            px: 2, py: 3,
          },
        }}
      >
        {/* Header del drawer */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, px: 1 }}>
          <Typography sx={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.02em",
          }}>
            STOREX
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "#fff" } }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 2 }} />

        <List disablePadding>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                className={({ isActive }) => `mobile-link${isActive ? " active" : ""}`}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: "10px", py: 1.4, px: 2, mb: 0.5,
                  "&:hover": { background: "rgba(255,255,255,0.05)" },
                  "&.active": { background: "rgba(255,255,255,0.08)" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                  <Box component="span" sx={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                    fontSize: "0.92rem", letterSpacing: "0.05em",
                    textTransform: "uppercase", color: "inherit",
                  }}>
                    {item.label}
                  </Box>
                  {item.path === "/Misfavoritos" && favoritos.length > 0 && (
                    <Box sx={{
                      display: "flex", alignItems: "center", gap: 0.3,
                      background: "rgba(239,68,68,0.18)",
                      border: "1px solid rgba(239,68,68,0.35)",
                      borderRadius: "20px", px: 0.8, py: 0.2,
                    }}>
                      <FavoriteIcon sx={{ fontSize: 10, color: "#ef4444" }} />
                      <Box component="span" sx={{
                        fontSize: "0.65rem", fontWeight: 800,
                        color: "#ef4444", fontFamily: "'DM Sans', sans-serif",
                      }}>
                        {favoritos.length}
                      </Box>
                    </Box>
                  )}
                  {item.path === "/Carrito" && totalItems > 0 && (
                    <Box sx={{
                      ml: "auto", background: "#fff", color: "#080808",
                      borderRadius: "20px", px: 0.9, py: 0.1,
                      fontSize: "0.65rem", fontWeight: 800,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      {totalItems}
                    </Box>
                  )}
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mt: 2, mb: 3 }} />

        {/* Botón carrito en drawer */}
        <Box
          onClick={() => { navigate("/Carrito"); setDrawerOpen(false); }}
          sx={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px", px: 2.5, py: 1.6, cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": { background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" },
          }}
        >
          <Typography sx={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            fontSize: "0.88rem", color: "#fff",
          }}>
            Ver carrito
          </Typography>
          <Badge badgeContent={totalItems} max={99} sx={{
            "& .MuiBadge-badge": {
              background: "#fff", color: "#080808",
              fontWeight: 800, fontSize: "0.58rem",
            },
          }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }} />
          </Badge>
        </Box>
      </Drawer>

      {/* ── Espaciador ── */}
      <Box sx={{ height: "68px" }} />
    </>
  );
};

export default Header;
