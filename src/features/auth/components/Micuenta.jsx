import { useState } from "react";
import { Avatar } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";

const pedidos = [
  {
    id: "#STX-4821",
    producto: 'Televisor JVC 32"',
    fecha: "28 Feb 2026",
    precio: "549.900",
    estado: "Entregado",
    color: "#10b981",
    imagen: "https://media.falabella.com/falabellaCO/73336578_1/w=1200,h=1200,fit=pad",
  },
  {
    id: "#STX-4750",
    producto: "Razer Kraken V3",
    fecha: "14 Feb 2026",
    precio: "260.000",
    estado: "En camino",
    color: "#f59e0b",
    imagen: "https://media.falabella.com/falabellaCO/149469813_01/w=1200,h=1200,fit=pad",
  },
  {
    id: "#STX-4633",
    producto: "Smartwatch D20",
    fecha: "01 Feb 2026",
    precio: "29.900",
    estado: "Procesando",
    color: "#3b82f6",
    imagen: "https://media.falabella.com/falabellaCO/146697626_01/w=1200,h=1200,fit=pad",
  },
];

const tabs = ["Resumen", "Pedidos", "Direcciones", "Pagos"];

const Micuenta = () => {
  const [activeTab, setActiveTab] = useState("Resumen");
  const [editando, setEditando] = useState(false);

  return (
    <div className="cuenta-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0;   }
        }

        .cuenta-page {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(160deg, #fafafa, #f0f0f0);
          padding: 56px 32px 80px;
          box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
          animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both;
        }

        /* ── Wrapper central ── */
        .cuenta-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* ── Hero de perfil ── */
        .cuenta-hero {
          display: flex;
          align-items: center;
          gap: 28px;
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 28px rgba(0,0,0,0.07);
          padding: 32px 36px;
          position: relative;
          overflow: hidden;
          flex-wrap: wrap;
        }
        .cuenta-hero::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(17,17,17,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .cuenta-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .cuenta-online-dot {
          position: absolute;
          bottom: 4px; right: 4px;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #4ade80;
          border: 2.5px solid #fff;
          z-index: 2;
        }
        .cuenta-online-dot::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-ring 1.6s ease-out infinite;
        }

        .cuenta-info {
          flex: 1;
          min-width: 200px;
        }
        .cuenta-nombre {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: #111;
          letter-spacing: -0.03em;
          margin: 0 0 4px;
        }
        .cuenta-email {
          font-size: 0.88rem;
          color: #888;
          margin: 0 0 16px;
          font-weight: 500;
        }
        .cuenta-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cuenta-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 100px;
          border: 1px solid rgba(0,0,0,0.08);
          font-size: 0.72rem;
          font-weight: 600;
          color: #555;
          background: #f5f5f5;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .cuenta-chip.premium {
          background: linear-gradient(135deg, #111, #333);
          color: #fff;
          border-color: transparent;
        }

        .cuenta-hero-stats {
          display: flex;
          gap: 0;
          margin-left: auto;
          flex-shrink: 0;
        }
        .cuenta-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 28px;
          border-right: 1px solid rgba(0,0,0,0.07);
        }
        .cuenta-stat:last-child { border-right: none; }
        .cuenta-stat-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.7rem;
          color: #111;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .cuenta-stat-label {
          font-size: 0.72rem;
          color: #999;
          font-weight: 500;
          margin-top: 4px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ── Tabs ── */
        .cuenta-tabs {
          display: flex;
          gap: 4px;
          background: #fff;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          padding: 6px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          width: fit-content;
        }
        .cuenta-tab {
          padding: 10px 22px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          font-weight: 600;
          color: #888;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
        }
        .cuenta-tab:hover { color: #333; background: #f5f5f5; }
        .cuenta-tab.active {
          color: #fff;
          background: linear-gradient(135deg, #111, #333);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        /* ── Body grid ── */
        .cuenta-body {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
        }
        @media (max-width: 860px) {
          .cuenta-body { grid-template-columns: 1fr; }
          .cuenta-hero-stats { margin-left: 0; width: 100%; justify-content: center; }
          .cuenta-stat { padding: 0 20px; }
        }
        @media (max-width: 560px) {
          .cuenta-page { padding: 40px 16px 60px; }
          .cuenta-hero { padding: 24px 20px; }
          .cuenta-hero-stats { gap: 0; }
          .cuenta-stat { padding: 0 14px; }
        }

        /* ── Card genérica ── */
        .cuenta-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .cuenta-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 24px 16px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .cuenta-card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: #111;
          letter-spacing: -0.02em;
          margin: 0;
        }

        /* ── Pedidos ── */
        .pedido-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          transition: background 0.2s ease;
        }
        .pedido-row:last-child { border-bottom: none; }
        .pedido-row:hover { background: #fafafa; }

        .pedido-img-wrap {
          width: 52px; height: 52px;
          border-radius: 12px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(0,0,0,0.06);
        }
        .pedido-img { width: 100%; height: 100%; object-fit: contain; padding: 6px; box-sizing: border-box; }

        .pedido-info { flex: 1; min-width: 0; }
        .pedido-nombre {
          font-weight: 700;
          font-size: 0.88rem;
          color: #111;
          margin: 0 0 3px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .pedido-meta {
          font-size: 0.75rem;
          color: #999;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pedido-precio {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: #111;
          letter-spacing: -0.02em;
          flex-shrink: 0;
        }
        .pedido-estado {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .pedido-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
        }

        /* ── Perfil / datos ── */
        .perfil-campo {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .perfil-campo:last-child { border-bottom: none; }
        .perfil-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0;
        }
        .perfil-valor {
          font-size: 0.92rem;
          font-weight: 600;
          color: #222;
          margin: 0;
        }
        .perfil-input {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          color: #222;
          background: #f5f5f5;
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          padding: 8px 12px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .perfil-input:focus { border-color: #111; }

        /* ── Sidebar cards ── */
        .side-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .side-item:last-child { border-bottom: none; }
        .side-item:hover { background: #f9f9f9; }
        .side-icon {
          width: 40px; height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .side-item-text { flex: 1; }
        .side-item-title {
          font-weight: 700;
          font-size: 0.87rem;
          color: #111;
          margin: 0 0 2px;
        }
        .side-item-sub {
          font-size: 0.75rem;
          color: #aaa;
          margin: 0;
        }
        .side-arrow {
          font-size: 0.9rem;
          color: #ccc;
        }

        /* ── Botón editar ── */
        .btn-edit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 10px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: #555;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-edit:hover {
          border-color: #111;
          color: #111;
          background: #f5f5f5;
        }
        .btn-save {
          background: linear-gradient(135deg,#111,#333);
          color: #fff;
          border-color: transparent;
        }
        .btn-save:hover {
          background: linear-gradient(135deg,#000,#1a1a1a) !important;
          border-color: transparent !important;
          color: #fff !important;
        }
      `}</style>

      <div className="cuenta-inner">

        {/* ── Hero ── */}
        <div className="cuenta-hero">
          <div className="cuenta-avatar-wrap">
            <Avatar
              sx={{
                width: 80, height: 80,
                background: "linear-gradient(135deg, #111 0%, #444 100%)",
                fontSize: "1.8rem",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                border: "3px solid #fff",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
              }}
            >
              VG
            </Avatar>
            <div className="cuenta-online-dot" />
          </div>

          <div className="cuenta-info">
            <h1 className="cuenta-nombre">Vicente Rios</h1>
            <p className="cuenta-email">vicente.rios@correo.com</p>
            <div className="cuenta-badges">
              <span className="cuenta-chip premium">⭐ Premium</span>
              <span className="cuenta-chip">Miembro desde 2024</span>
            </div>
          </div>

          <div className="cuenta-hero-stats">
            <div className="cuenta-stat">
              <span className="cuenta-stat-num">12</span>
              <span className="cuenta-stat-label">Pedidos</span>
            </div>
            <div className="cuenta-stat">
              <span className="cuenta-stat-num">5</span>
              <span className="cuenta-stat-label">Favoritos</span>
            </div>
            <div className="cuenta-stat">
              <span className="cuenta-stat-num">2</span>
              <span className="cuenta-stat-label">Reseñas</span>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="cuenta-tabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={`cuenta-tab${activeTab === t ? " active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Body ── */}
        <div className="cuenta-body">

          {/* Columna principal */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Datos personales */}
            <div className="cuenta-card">
              <div className="cuenta-card-header">
                <h3 className="cuenta-card-title">Datos personales</h3>
                <button
                  className={`btn-edit${editando ? " btn-save" : ""}`}
                  onClick={() => setEditando(!editando)}
                >
                  {editando
                    ? <><CheckCircleOutlineIcon sx={{ fontSize: 15 }} /> Guardar</>
                    : <><EditOutlinedIcon sx={{ fontSize: 15 }} /> Editar</>
                  }
                </button>
              </div>

              {[
                { label: "Nombre completo", valor: "Vicente Rios" },
                { label: "Correo electrónico", valor: "vicente.rios@correo.com" },
                { label: "Teléfono", valor: "+57 310 456 7890" },
                { label: "Ciudad", valor: "Medellín, Colombia" },
              ].map(({ label, valor }) => (
                <div className="perfil-campo" key={label}>
                  <p className="perfil-label">{label}</p>
                  {editando
                    ? <input className="perfil-input" defaultValue={valor} />
                    : <p className="perfil-valor">{valor}</p>
                  }
                </div>
              ))}
            </div>

            {/* Últimos pedidos */}
            <div className="cuenta-card">
              <div className="cuenta-card-header">
                <h3 className="cuenta-card-title">Últimos pedidos</h3>
                <button className="btn-edit">Ver todos</button>
              </div>

              {pedidos.map((p) => (
                <div className="pedido-row" key={p.id}>
                  <div className="pedido-img-wrap">
                    <img className="pedido-img" src={p.imagen} alt={p.producto} />
                  </div>
                  <div className="pedido-info">
                    <p className="pedido-nombre">{p.producto}</p>
                    <p className="pedido-meta">
                      <span>{p.id}</span>
                      <span style={{ color: "#ddd" }}>·</span>
                      <span>{p.fecha}</span>
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                    <p className="pedido-precio">COP ${p.precio}</p>
                    <span
                      className="pedido-estado"
                      style={{ background: `${p.color}18`, color: p.color }}
                    >
                      <span className="pedido-dot" style={{ background: p.color }} />
                      {p.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Accesos rápidos */}
            <div className="cuenta-card">
              <div className="cuenta-card-header">
                <h3 className="cuenta-card-title">Accesos rápidos</h3>
              </div>

              {[
                {
                  icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 18 }} />,
                  bg: "#f0fdf4", color: "#10b981",
                  title: "Mis pedidos",
                  sub: "12 pedidos en total"
                },
                {
                  icon: <FavoriteBorderIcon sx={{ fontSize: 18 }} />,
                  bg: "#fff1f2", color: "#ef4444",
                  title: "Favoritos",
                  sub: "5 productos guardados"
                },
                {
                  icon: <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />,
                  bg: "#eff6ff", color: "#3b82f6",
                  title: "Direcciones",
                  sub: "2 direcciones guardadas"
                },
                {
                  icon: <CreditCardOutlinedIcon sx={{ fontSize: 18 }} />,
                  bg: "#fdf4ff", color: "#a855f7",
                  title: "Métodos de pago",
                  sub: "1 tarjeta guardada"
                },
                {
                  icon: <NotificationsNoneIcon sx={{ fontSize: 18 }} />,
                  bg: "#fffbeb", color: "#f59e0b",
                  title: "Notificaciones",
                  sub: "3 notificaciones nuevas"
                },
              ].map(({ icon, bg, color, title, sub }) => (
                <div className="side-item" key={title}>
                  <div className="side-icon" style={{ background: bg, color }}>
                    {icon}
                  </div>
                  <div className="side-item-text">
                    <p className="side-item-title">{title}</p>
                    <p className="side-item-sub">{sub}</p>
                  </div>
                  <span className="side-arrow">›</span>
                </div>
              ))}
            </div>

            {/* Cerrar sesión */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "14px 20px",
                borderRadius: 14,
                border: "1.5px solid rgba(239,68,68,0.2)",
                background: "rgba(239,68,68,0.04)",
                color: "#ef4444",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.01em"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(239,68,68,0.1)";
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(239,68,68,0.04)";
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)";
              }}
            >
              <LogoutIcon sx={{ fontSize: 18 }} />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Micuenta;
