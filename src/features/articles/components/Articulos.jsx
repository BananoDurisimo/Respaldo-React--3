import { useState, useEffect, useRef } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavoritos } from "../../auth/hooks/FavoritosContext";
import { useCarrito } from "../hooks/CarritoContext";

const productos = [
  {
    nombre: 'Televisor JVC 32"',
    precio: "549.900",
    descripcion: "Imagen nítida, sonido envolvente. Tu sala nunca se vio tan bien.",
    imagen: "https://media.falabella.com/falabellaCO/73336578_1/w=1200,h=1200,fit=pad",
    badge: "Más vendido",
    badgeColor: "#f59e0b",
    categoria: "Hogar"
  },
  {
    nombre: "Smartwatch D20",
    precio: "29.900",
    descripcion: "Monitorea tu vida. Pasos, ritmo cardíaco y más en tu muñeca.",
    imagen: "https://media.falabella.com/falabellaCO/146697626_01/w=1200,h=1200,fit=pad",
    badge: "Oferta",
    badgeColor: "#ef4444",
    categoria: "Wearables"
  },
  {
    nombre: 'Monitor LG 24" IPS 120Hz',
    precio: "399.900",
    descripcion: "Full HD con AMD FreeSync. Cada frame, perfectamente renderizado.",
    imagen: "https://media.falabella.com/falabellaCO/150640576_01/w=1200,h=1200,fit=pad",
    badge: "Gaming",
    badgeColor: "#8b5cf6",
    categoria: "Gaming"
  },
  {
    nombre: "Razer Kraken V3",
    precio: "260.000",
    descripcion: "Audio 7.1 envolvente. Escucha cada detalle, domina cada partida.",
    imagen: "https://media.falabella.com/falabellaCO/149469813_01/w=1200,h=1200,fit=pad",
    badge: "Pro Gaming",
    badgeColor: "#10b981",
    categoria: "Gaming"
  },
  {
    nombre: "HP EliteBook",
    precio: "8.999.900",
    descripcion: "32GB RAM · 1TB SSD. Potencia empresarial donde la necesites.",
    imagen: "https://media.falabella.com/falabellaCO/140707426_001/w=1200,h=1200,fit=pad",
    badge: "Premium",
    badgeColor: "#3b82f6",
    categoria: "Laptops"
  },
  {
    nombre: "Esenses TWS-200",
    precio: "69.900",
    descripcion: "Cancelación de ruido activa. Solo tú y tu música.",
    imagen: "https://media.falabella.com/sodimacCO/720573_1/w=1200,h=1200,fit=pad",
    badge: "Nuevo",
    badgeColor: "#ec4899",
    categoria: "Audio"
  }
];

const categorias = ["Todos", "Gaming", "Laptops", "Audio", "Wearables", "Hogar"];

/* ── Hook: detecta cuando el elemento entra al viewport ── */
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Tarjeta de producto ── */
const Articulo = ({ nombre, precio, descripcion, imagen, badge, badgeColor, categoria, onToggleFavorito, esFavorito, index }) => {
  const [ref, visible] = useVisible();
  const [added, setAdded] = useState(false);
  const [favAnim, setFavAnim] = useState(false);
  const { agregarAlCarrito } = useCarrito();

  const handleCart = () => {
    if (added) return;
    agregarAlCarrito({ nombre, precio, descripcion, imagen, badge, badgeColor, categoria });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleFav = () => {
    setFavAnim(true);
    setTimeout(() => setFavAnim(false), 350);
    onToggleFavorito();
  };

  return (
    <div
      ref={ref}
      className="articulo-card"
      style={{ animationDelay: `${index * 90}ms`, animationPlayState: visible ? "running" : "paused" }}
    >
      {/* Badge */}
      <span className="articulo-badge" style={{ background: badgeColor }}>
        {badge}
      </span>

      {/* Favorito */}
      <button
        className={`articulo-fav${favAnim ? " fav-pop" : ""}${esFavorito ? " fav-active" : ""}`}
        onClick={handleFav}
      >
        {esFavorito
          ? <FavoriteIcon style={{ fontSize: 18, color: "#ef4444" }} />
          : <FavoriteBorderIcon style={{ fontSize: 18, color: "#aaa" }} />
        }
      </button>

      {/* Imagen con overlay */}
      <div className="articulo-img-wrap">
        <img className="articulo-img" src={imagen} alt={nombre} />
        <div className="articulo-img-overlay" />
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
        <button
          className={`articulo-btn${added ? " btn-added" : ""}`}
          onClick={handleCart}
        >
          {added
            ? <><CheckIcon style={{ fontSize: 16 }} /> Añadido</>
            : <><ShoppingCartOutlinedIcon style={{ fontSize: 16 }} /> Añadir al carrito</>
          }
        </button>
      </div>
    </div>
  );
};

/* ── Página principal ── */
const Articulos = () => {
  const { toggleFavorito, esFavorito } = useFavoritos();
  const [filtro, setFiltro] = useState("Todos");
  const [headerRef, headerVisible] = useVisible(0.1);

  const productosFiltrados = filtro === "Todos"
    ? productos
    : productos.filter(p => p.categoria === filtro);

  return (
    <div className="articulos-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes favPop {
          0%   { transform: scale(1);   }
          40%  { transform: scale(1.45); }
          70%  { transform: scale(0.88); }
          100% { transform: scale(1);   }
        }
        @keyframes btnSuccess {
          0%   { transform: scale(1);    }
          30%  { transform: scale(0.95); }
          60%  { transform: scale(1.03); }
          100% { transform: scale(1);    }
        }
        @keyframes headerIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes dividerGrow {
          from { width: 0; }
          to   { width: 56px; }
        }
        @keyframes filterSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Página ── */
        .articulos-page {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(160deg, #fafafa 0%, #efefef 100%);
          padding: 64px 32px 80px;
          box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Header ── */
        .articulos-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .articulos-header.visible .articulos-titulo,
        .articulos-header.visible .articulos-sub,
        .articulos-header.visible .articulos-divider {
          animation-play-state: running;
        }

        .articulos-titulo {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          margin: 0 0 14px;
          background: linear-gradient(90deg, #111 20%, #666 50%, #111 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: headerIn 0.7s cubic-bezier(.22,.68,0,1.2) both paused,
                     shimmer 5s linear 0.7s infinite paused;
        }
        .articulos-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: #999;
          margin: 0 auto 20px;
          max-width: 440px;
          line-height: 1.65;
          animation: headerIn 0.7s cubic-bezier(.22,.68,0,1.2) 0.12s both paused;
        }
        .articulos-divider {
          height: 3px;
          background: linear-gradient(90deg, #111, #555);
          border-radius: 2px;
          margin: 0 auto;
          animation: dividerGrow 0.6s cubic-bezier(.22,.68,0,1.2) 0.3s both paused;
        }

        /* ── Filtros ── */
        .articulos-filtros {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 52px;
          animation: filterSlide 0.5s cubic-bezier(.22,.68,0,1.2) 0.45s both;
        }
        .filtro-chip {
          padding: 8px 20px;
          border-radius: 100px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: #777;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(.22,.68,0,1.2);
          letter-spacing: 0.02em;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .filtro-chip:hover {
          border-color: #333;
          color: #111;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }
        .filtro-chip.active {
          background: linear-gradient(135deg, #111, #333);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }

        /* ── Grid ── */
        .articulos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 900px) { .articulos-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px) { .articulos-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .articulos-page { padding: 48px 16px 60px; } }

        /* ── Card ── */
        .articulo-card {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 500px;
          border-radius: 22px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          overflow: hidden;
          box-sizing: border-box;
          animation: fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) both paused;
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2),
                      box-shadow 0.35s ease,
                      border-color 0.3s ease;
        }
        .articulo-card:hover {
          transform: translateY(-10px) scale(1.015);
          box-shadow: 0 28px 64px rgba(0,0,0,0.14);
          border-color: rgba(0,0,0,0.1);
        }
        .articulo-card:hover .articulo-img { transform: scale(1.08); }
        .articulo-card:hover .articulo-img-overlay { opacity: 1; }

        /* Badge */
        .articulo-badge {
          position: absolute;
          top: 14px; left: 14px;
          z-index: 2;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.64rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        /* Favorito */
        .articulo-fav {
          position: absolute;
          top: 12px; right: 12px;
          z-index: 2;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.14);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          padding: 0;
        }
        .articulo-fav:hover { transform: scale(1.1); box-shadow: 0 4px 18px rgba(0,0,0,0.18); }
        .articulo-fav.fav-pop { animation: favPop 0.35s cubic-bezier(.22,.68,0,1.2); }
        .articulo-fav.fav-active { background: rgba(255,240,240,0.95); }

        /* Imagen */
        .articulo-img-wrap {
          position: relative;
          width: 100%;
          height: 220px; min-height: 220px; max-height: 220px;
          background: #f5f5f5;
          display: flex;
          align-items: center; justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .articulo-img {
          width: 100%; height: 100%;
          object-fit: contain;
          padding: 16px;
          box-sizing: border-box;
          transition: transform 0.55s cubic-bezier(.22,.68,0,1.2);
        }
        .articulo-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.08), transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        /* Texto */
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
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
          color: #111;
          margin: 0 0 8px;
          letter-spacing: -0.03em;
        }
        .articulo-cop {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: #aaa;
          margin-right: 3px;
        }
        .articulo-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: #888;
          margin: 0;
          line-height: 1.55;
        }

        /* Botón */
        .articulo-footer {
          padding: 12px 20px 20px;
          flex-shrink: 0;
        }
        .articulo-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 0;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #111, #333);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(.22,.68,0,1.2);
          letter-spacing: 0.01em;
        }
        .articulo-btn:hover {
          background: linear-gradient(135deg, #000, #1a1a1a);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.22);
        }
        .articulo-btn.btn-added {
          background: linear-gradient(135deg, #10b981, #059669);
          animation: btnSuccess 0.35s cubic-bezier(.22,.68,0,1.2);
          box-shadow: 0 6px 20px rgba(16,185,129,0.35);
        }

        /* Sin resultados */
        .sin-resultados {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #bbb;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          animation: fadeUp 0.5s ease both;
        }
      `}</style>

      {/* ── Header ── */}
      <div
        ref={headerRef}
        className={`articulos-header${headerVisible ? " visible" : ""}`}
      >
        <h2 className="articulos-titulo">Productos Destacados</h2>
        <p className="articulos-sub">Tecnología seleccionada para transformar tu día a día</p>
        <div className="articulos-divider" />
      </div>

      {/* ── Filtros ── */}
      <div className="articulos-filtros">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`filtro-chip${filtro === cat ? " active" : ""}`}
            onClick={() => setFiltro(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="articulos-grid">
        {productosFiltrados.length === 0
          ? <p className="sin-resultados">No hay productos en esta categoría.</p>
          : productosFiltrados.map((producto, index) => (
            <Articulo
              key={producto.nombre}
              {...producto}
              index={index}
              esFavorito={esFavorito(producto.nombre)}
              onToggleFavorito={() => toggleFavorito(producto)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Articulos;
