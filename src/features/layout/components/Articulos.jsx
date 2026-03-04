import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/* =========================
   Plantilla reutilizable
========================= */
const Articulo = ({ nombre, precio, descripcion, imagen }) => {
  return (
    <Card
  sx={{
    width: "31.4vw",    
    minHeight: "60vh",    
    borderRadius: 0,      
    display: "flex",
    flexDirection: "column"
  }}
>
      {/* Imagen */}
      <CardMedia
  component="img"
  image={imagen}
  alt={nombre}
  sx={{
    width: "100%",
    height: "auto",      // 👈 altura fuerte
    minHeight: "300px",  // 👈 mínimo
    objectFit: "cover"
  }}
/>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500
          }}
        >
          {nombre}
        </Typography>

        <Typography sx={{ fontWeight: 600, my: 1 }}>
          ${precio}
        </Typography>

        <Typography variant="body2" sx={{ color: "#555" }}>
          {descripcion}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "#222" }
          }}
        >
          Añadir
        </Button>

        <Button
          variant="outlined"
          sx={{
            borderColor: "#000",
            color: "#000",
            minWidth: "50px",
            "&:hover": {
              borderColor: "#000",
              backgroundColor: "#eee"
            }
          }}
        >
          <FavoriteBorderIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

/* =========================
   Componente Principal
========================= */

const Articulos = () => {
  return (
    <Box
  sx={{
    width: "95vw",          // 👈 ocupa todo el ancho real de la pantalla
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    py: 6,
    px: 6,
    margin: 0
  }}
>
      <Grid container spacing={0}>
        
        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Articulo
            nombre="Televisor | JVC | 32 Pulgadas"
            precio="549.900"
            descripcion="Producto elegante y moderno."
            imagen="https://media.falabella.com/falabellaCO/73336578_1/w=1200,h=1200,fit=pad"
          />
        </Grid>

        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Articulo
            nombre="Smartwatch D20"
            precio="29.900"
            descripcion="Ideal para uso diario."
            imagen="https://media.falabella.com/falabellaCO/146697626_01/w=1200,h=1200,fit=pad"
          />
        </Grid>

        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Articulo
            nombre="Monitor LG 24 IPS 120Hz tecnología AMD FreeSync™ 24U411 Full HD"
            precio="399.900"
            descripcion="Edición especial premium."
            imagen="https://media.falabella.com/falabellaCO/150640576_01/w=1200,h=1200,fit=pad"
          />
        </Grid>

        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Articulo
            nombre="Audifonos Razer Kraken V3 HyperSense"
            precio="260.000"
            descripcion="Producto elegante y moderno."
            imagen="https://media.falabella.com/falabellaCO/149469813_01/w=1200,h=1200,fit=pad"
          />
        </Grid>

        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Articulo
            nombre="Portatil - HP EliteBook Táctil - Intel Core Ultra 7 155U - Tecnología vPro - 32GB RAM - 1TB SSD"
            precio="8.999.900"
            descripcion="Producto elegante y moderno."
            imagen="https://media.falabella.com/falabellaCO/140707426_001/w=1200,h=1200,fit=pad"
          />
        </Grid>

        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Articulo
            nombre="Audífonos Esenses Inalámbrico Cancelación Ruido Tws-200 Negro"
            precio="69.900"
            descripcion="Producto elegante y moderno."
            imagen="https://media.falabella.com/sodimacCO/720573_1/w=1200,h=1200,fit=pad"
          />
        </Grid>

      </Grid>
    </Box>
  );
};

export default Articulos;