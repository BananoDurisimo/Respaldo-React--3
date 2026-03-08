import { useState } from "react";
import {
  Box, Grid, Card, CardContent,
  Typography, Button, CardActions
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NavLink } from "react-router-dom";
import { useFavoritos } from "../hooks/FavoritosContext";
import { useCarrito } from "../../articles/hooks/CarritoContext";

// ─── Tarjeta reutilizable ──────────────────────────────────────────────────────
const Articulo = ({ nombre, precio, descripcion, imagen, badge, badgeColor, onToggleFavorito, esFavorito }) => {
  const [added, setAdded] = useState(false);
  const { agregarAlCarrito } = useCarrito();

  const handleCart = () => {
    if (added) return;
    agregarAlCarrito({ nombre, precio, descripcion, imagen, badge, badgeColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "500px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-10px) scale(1.01)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.13)"
        },
        "&:hover .img-zoom": { transform: "scale(1.07)" }
      }}
    >
      <Box sx={{
        position: "absolute", top: 14, left: 14, zIndex: 2,
        background: badgeColor, color: "#fff",
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
        fontSize: "0.68rem", letterSpacing: "0.06em",
        textTransform: "uppercase", px: 1.4, py: 0.5, borderRadius: "8px"
      }}>
        {badge}
      </Box>

      <Box
        onClick={onToggleFavorito}
        sx={{
          position: "absolute", top: 12, right: 12, zIndex: 2,
          width: 38, height: 38, borderRadius: "50%",
          background: esFavorito ? "rgba(255,240,240,0.95)" : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          transition: "transform 0.2s ease",
          "&:hover": { transform: "scale(1.15)", background: "#fff" }
        }}
      >
        {esFavorito
          ? <FavoriteIcon sx={{ fontSize: 19, color: "#ef4444" }} />
          : <FavoriteBorderIcon sx={{ fontSize: 19, color: "#999" }} />
        }
      </Box>

      <Box sx={{
        height: "220px", overflow: "hidden",
        background: "linear-gradient(145deg, #f9f9f9, #efefef)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
      }}>
        <Box
          component="img" className="img-zoom"
          src={imagen} alt={nombre}
          sx={{
            width: "100%", height: "100%", objectFit: "contain", p: 2.5,
            transition: "transform 0.5s cubic-bezier(.22,.68,0,1.2)"
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, px: 2.5, pt: 2.2, pb: 0.5 }}>
        <Typography sx={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
          fontSize: "1rem", color: "#111", mb: 0.6, lineHeight: 1.3
        }}>
          {nombre}
        </Typography>
        <Typography sx={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
          fontSize: "1.35rem", color: "#111", mb: 0.8, letterSpacing: "-0.03em"
        }}>
          <Box component="span" sx={{ fontSize: "0.8rem", fontWeight: 500, color: "#888", mr: 0.3 }}>COP</Box>
          ${precio}
        </Typography>
        <Typography sx={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
          color: "#777", lineHeight: 1.55
        }}>
          {descripcion}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2.5, pb: 2.5, pt: 1.5 }}>
        <Button
          variant="contained" fullWidth
          startIcon={added ? <CheckIcon /> : <ShoppingCartOutlinedIcon />}
          onClick={handleCart}
          sx={{
            background: added
              ? "linear-gradient(135deg,#10b981,#059669)"
              : "linear-gradient(135deg,#111,#333)",
            borderRadius: "12px", textTransform: "none",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            fontSize: "0.88rem", py: 1.3, boxShadow: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              background: added
                ? "linear-gradient(135deg,#059669,#047857)"
                : "linear-gradient(135deg,#000,#1a1a1a)",
              transform: "translateY(-1px)", boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
            }
          }}
        >
          {added ? "Añadido" : "Añadir al carrito"}
        </Button>
      </CardActions>
    </Card>
  );
};

// ─── Página Favoritos ─────────────────────────────────────────────────────────
const Misfavoritos = () => {
  const { favoritos, toggleFavorito, esFavorito } = useFavoritos();

  return (
    <Box sx={{
      width: "100%", minHeight: "100vh",
      background: "linear-gradient(160deg, #fafafa 0%, #f0f0f0 100%)",
      py: 8, px: { xs: 2, md: 4 }
    }}>
      {/* Encabezado */}
      <Box sx={{ textAlign: "center", mb: 7 }}>
        <Typography sx={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
          fontSize: { xs: "2rem", md: "2.8rem" }, color: "#111",
          letterSpacing: "-0.04em", lineHeight: 1.1, mb: 1.5
        }}>
          Mis Favoritos
        </Typography>
        <Typography sx={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
          color: "#999", maxWidth: 420, mx: "auto", lineHeight: 1.6
        }}>
          {favoritos.length > 0
            ? `${favoritos.length} producto${favoritos.length > 1 ? "s" : ""} guardado${favoritos.length > 1 ? "s" : ""}`
            : "Aún no has guardado ningún producto"}
        </Typography>
        <Box sx={{
          width: 48, height: 4,
          background: "linear-gradient(90deg,#ef4444,#f87171)",
          borderRadius: 2, mx: "auto", mt: 2.5
        }} />
      </Box>

      {/* Lista de favoritos */}
      {favoritos.length > 0 ? (
        <Box sx={{ maxWidth: 1280, mx: "auto" }}>
          <Grid container spacing={3.5}>
            {favoritos.map((producto, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
                <Articulo
                  {...producto}
                  esFavorito={esFavorito(producto.nombre)}
                  onToggleFavorito={() => toggleFavorito(producto)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        /* Estado vacío */
        <Box sx={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 3, mt: 6
        }}>
          <Box sx={{
            width: 80, height: 80, borderRadius: "50%",
            background: "#f0f0f0",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <FavoriteBorderIcon sx={{ fontSize: 36, color: "#ccc" }} />
          </Box>
          <Typography sx={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
            color: "#aaa", textAlign: "center", maxWidth: 300, lineHeight: 1.6
          }}>
            Explora los productos y toca el corazón para guardarlos aquí.
          </Typography>
          <Button
            component={NavLink}
            to="/Articulos"
            variant="contained"
            sx={{
              background: "linear-gradient(135deg,#111,#333)",
              borderRadius: "12px", textTransform: "none",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              px: 4, py: 1.4, boxShadow: "none",
              "&:hover": { background: "linear-gradient(135deg,#000,#1a1a1a)" }
            }}
          >
            Ver Artículos
          </Button>
        </Box>
      )}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </Box>
  );
};

export default Misfavoritos;
