import React from "react";
import { Typography, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavoritos } from "../hooks/FavoritosContext";

const productos = [
  {
    nombre: 'Televisor JVC 32"',
    precio: "549.900",
    descripcion: "Imagen nítida, sonido envolvente. Tu sala nunca se vio tan bien.",
    imagen: "https://media.falabella.com/falabellaCO/73336578_1/w=1200,h=1200,fit=pad",
    badge: "Más vendido",
    badgeColor: "#f59e0b"
  },
  {
    nombre: "Smartwatch D20",
    precio: "29.900",
    descripcion: "Monitorea tu vida. Pasos, ritmo cardíaco y más en tu muñeca.",
    imagen: "https://media.falabella.com/falabellaCO/146697626_01/w=1200,h=1200,fit=pad",
    badge: "Oferta",
    badgeColor: "#ef4444"
  },
  {
    nombre: 'Monitor LG 24" IPS 120Hz',
    precio: "399.900",
    descripcion: "Full HD con AMD FreeSync. Cada frame, perfectamente renderizado.",
    imagen: "https://media.falabella.com/falabellaCO/150640576_01/w=1200,h=1200,fit=pad",
    badge: "Gaming",
    badgeColor: "#8b5cf6"
  },
  {
    nombre: "Razer Kraken V3",
    precio: "260.000",
    descripcion: "Audio 7.1 envolvente. Escucha cada detalle, domina cada partida.",
    imagen: "https://media.falabella.com/falabellaCO/149469813_01/w=1200,h=1200,fit=pad",
    badge: "Pro Gaming",
    badgeColor: "#10b981"
  },
  {
    nombre: "HP EliteBook",
    precio: "8.999.900",
    descripcion: "32GB RAM · 1TB SSD. Potencia empresarial donde la necesites.",
    imagen: "https://media.falabella.com/falabellaCO/140707426_001/w=1200,h=1200,fit=pad",
    badge: "Premium",
    badgeColor: "#3b82f6"
  },
  {
    nombre: "Esenses TWS-200",
    precio: "69.900",
    descripcion: "Cancelación de ruido activa. Solo tú y tu música.",
    imagen: "https://media.falabella.com/sodimacCO/720573_1/w=1200,h=1200,fit=pad",
    badge: "Nuevo",
    badgeColor: "#ec4899"
  }
];

const Articulo = ({ nombre, precio, descripcion, imagen, badge, badgeColor, onToggleFavorito, esFavorito }) => (
  <div className="articulo-card">
    {/* Badge */}
    <span className="articulo-badge" style={{ background: badgeColor }}>
      {badge}
    </span>

    {/* Favorito */}
    <button className="articulo-fav" onClick={onToggleFavorito}>
      {esFavorito
        ? <FavoriteIcon style={{ fontSize: 18, color: "#ef4444" }} />
        : <FavoriteBorderIcon style={{ fontSize: 18, color: "#aaa" }} />
      }
    </button>

    {/* Imagen */}
    <div className="articulo-img-wrap">
      <img className="articulo-img" src={imagen} alt={nombre} />
    </div>

    {/* Texto */}
    <div className="articulo-body">
      <p className="articulo-nombre">{nombre}</p>
      <p className="articulo-precio">
        <span className="articulo-cop">COP</span>${precio}
      </p>
      <p className="articulo-desc">{descripcion}</p>
    </div>

    {/* Botón */}
    <div className="articulo-footer">
      <Button
        variant="contained"
        fullWidth
        startIcon={<ShoppingCartOutlinedIcon />}
        className="articulo-btn"
      >
        Añadir al carrito
      </Button>
    </div>
  </div>
);

const Articulos = () => {
  const { toggleFavorito, esFavorito } = useFavoritos();

  return (
    <div className="articulos-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .articulos-page {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(160deg, #fafafa, #f0f0f0);
          padding: 64px 32px;
          box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
        }

        .articulos-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .articulos-titulo {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 800;
          color: #111;
          letter-spacing: -0.04em;
          margin: 0 0 12px;
        }
        .articulos-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: #999;
          margin: 0 auto 20px;
          max-width: 420px;
          line-height: 1.6;
        }
        .articulos-divider {
          width: 48px;
          height: 4px;
          background: linear-gradient(90deg, #111, #555);
          border-radius: 2px;
          margin: 0 auto;
        }

        /* CSS Grid nativo — sin MUI Grid */
        .articulos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .articulos-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .articulos-grid { grid-template-columns: 1fr; }
        }

        /* Card — altura fija controlada por CSS puro */
        .articulo-card {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 500px;          /* altura fija, inamovible */
          border-radius: 20px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2),
                      box-shadow 0.35s ease;
          box-sizing: border-box;
        }
        .articulo-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 60px rgba(0,0,0,0.13);
        }
        .articulo-card:hover .articulo-img {
          transform: scale(1.07);
        }

        /* Badge */
        .articulo-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 8px;
        }

        /* Favorito */
        .articulo-fav {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
          transition: transform 0.2s ease;
          padding: 0;
        }
        .articulo-fav:hover { transform: scale(1.15); }

        /* Imagen — 220px fijos */
        .articulo-img-wrap {
          width: 100%;
          height: 220px;
          min-height: 220px;
          max-height: 220px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .articulo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 16px;
          box-sizing: border-box;
          transition: transform 0.5s cubic-bezier(.22,.68,0,1.2);
        }

        /* Texto — ocupa el espacio restante */
        .articulo-body {
          flex: 1;
          padding: 16px 20px 0;
          overflow: hidden;
        }
        .articulo-nombre {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.98rem;
          color: #111;
          margin: 0 0 6px;
          line-height: 1.3;
        }
        .articulo-precio {
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
          color: #111;
          margin: 0 0 8px;
          letter-spacing: -0.03em;
        }
        .articulo-cop {
          font-size: 0.75rem;
          font-weight: 500;
          color: #999;
          margin-right: 3px;
        }
        .articulo-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: #777;
          margin: 0;
          line-height: 1.55;
        }

        /* Botón — pegado al fondo */
        .articulo-footer {
          padding: 12px 20px 20px;
          flex-shrink: 0;
        }
        .articulo-btn {
          background: linear-gradient(135deg,#111,#333) !important;
          border-radius: 12px !important;
          text-transform: none !important;
          font-family: 'DM Sans', sans-serif !important;
          font-weight: 600 !important;
          font-size: 0.88rem !important;
          box-shadow: none !important;
          transition: all 0.3s ease !important;
        }
        .articulo-btn:hover {
          background: linear-gradient(135deg,#000,#1a1a1a) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2) !important;
        }
      `}</style>

      {/* Header */}
      <div className="articulos-header">
        <h2 className="articulos-titulo">Productos Destacados</h2>
        <p className="articulos-sub">Tecnología seleccionada para transformar tu día a día</p>
        <div className="articulos-divider" />
      </div>

      {/* Grid */}
      <div className="articulos-grid">
        {productos.map((producto, index) => (
          <Articulo
            key={index}
            {...producto}
            esFavorito={esFavorito(producto.nombre)}
            onToggleFavorito={() => toggleFavorito(producto)}
          />
        ))}
      </div>
    </div>
  );
};

export default Articulos;
