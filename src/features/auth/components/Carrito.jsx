import { useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCarrito } from "../../articles/hooks/CarritoContext";

/* ── Fila de producto en el carrito ── */
const CarritoItem = ({ nombre, precio, imagen, badge, badgeColor, cantidad, onQuitarItem, onCambiarCantidad }) => {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onQuitarItem(nombre), 320);
  };

  const precioNum = parseInt(precio.replace(/\./g, ""), 10) || 0;
  const subtotal = (precioNum * cantidad).toLocaleString("es-CO");

  return (
    <div className={`carrito-item${removing ? " item-removing" : ""}`}>
      {/* Imagen */}
      <div className="carrito-item-img">
        <img src={imagen} alt={nombre} />
      </div>

      {/* Info */}
      <div className="carrito-item-info">
        {badge && (
          <span className="carrito-item-badge" style={{ background: badgeColor }}>
            {badge}
          </span>
        )}
        <p className="carrito-item-nombre">{nombre}</p>
        <p className="carrito-item-precio">
          <span className="carrito-item-cop">COP</span>${precio}
          <span className="carrito-item-unit"> / unid.</span>
        </p>
      </div>

      {/* Controles de cantidad */}
      <div className="carrito-item-qty">
        <button
          className="qty-btn"
          onClick={() => onCambiarCantidad(nombre, -1)}
          disabled={cantidad <= 1}
        >
          <RemoveIcon style={{ fontSize: 14 }} />
        </button>
        <span className="qty-num">{cantidad}</span>
        <button className="qty-btn" onClick={() => onCambiarCantidad(nombre, 1)}>
          <AddIcon style={{ fontSize: 14 }} />
        </button>
      </div>

      {/* Subtotal */}
      <div className="carrito-item-subtotal">
        <p className="subtotal-label">Total</p>
        <p className="subtotal-valor">COP ${subtotal}</p>
      </div>

      {/* Eliminar */}
      <button className="carrito-item-del" onClick={handleRemove} title="Eliminar">
        <DeleteOutlineIcon style={{ fontSize: 18 }} />
      </button>
    </div>
  );
};

/* ── Página Carrito ── */
const Carrito = () => {
  const { carrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito, totalItems, totalPrecio } = useCarrito();
  const [checkout, setCheckout] = useState(false);

  const handleCheckout = () => {
    setCheckout(true);
    setTimeout(() => setCheckout(false), 3000);
    vaciarCarrito();
  };

  const envio = totalPrecio > 300000 ? 0 : 15000;
  const total = totalPrecio + envio;

  return (
    <div className="carrito-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideOut {
          to { opacity: 0; transform: translateX(30px) scale(0.97); }
        }
        @keyframes checkPop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes successPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.3); }
          50%       { box-shadow: 0 0 0 16px rgba(16,185,129,0); }
        }

        /* ── Página ── */
        .carrito-page {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(160deg, #fafafa 0%, #efefef 100%);
          padding: 60px 32px 80px;
          box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
          animation: fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) both;
        }

        .carrito-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* ── Header ── */
        .carrito-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .carrito-titulo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: #111;
          letter-spacing: -0.04em;
          margin: 0;
          line-height: 1;
        }
        .carrito-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: #aaa;
          margin: 6px 0 0;
          font-weight: 500;
        }
        .carrito-vaciar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1.5px solid rgba(239,68,68,0.2);
          background: rgba(239,68,68,0.04);
          color: #ef4444;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .carrito-vaciar:hover {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.4);
        }

        /* ── Divisor decorativo ── */
        .carrito-divider {
          width: 48px;
          height: 3px;
          background: linear-gradient(90deg, #111, #555);
          border-radius: 2px;
        }

        /* ── Body: lista + resumen ── */
        .carrito-body {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .carrito-body { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .carrito-page { padding: 44px 16px 60px; }
        }

        /* ── Lista de items ── */
        .carrito-lista {
          background: #fff;
          border-radius: 22px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .carrito-lista-header {
          padding: 20px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .carrito-lista-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: #111;
          margin: 0;
        }
        .carrito-count-chip {
          padding: 2px 10px;
          border-radius: 100px;
          background: #111;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
        }

        /* ── Item row ── */
        .carrito-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          transition: background 0.2s ease, opacity 0.32s ease, transform 0.32s ease;
          animation: fadeUp 0.45s cubic-bezier(.22,.68,0,1.2) both;
        }
        .carrito-item:last-child { border-bottom: none; }
        .carrito-item:hover { background: #fafafa; }
        .carrito-item.item-removing {
          animation: slideOut 0.32s cubic-bezier(.22,.68,0,1.2) forwards;
        }

        .carrito-item-img {
          width: 68px; height: 68px;
          border-radius: 14px;
          background: #f5f5f5;
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .carrito-item-img img {
          width: 100%; height: 100%;
          object-fit: contain;
          padding: 8px;
          box-sizing: border-box;
        }

        .carrito-item-info {
          flex: 1;
          min-width: 0;
        }
        .carrito-item-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 6px;
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .carrito-item-nombre {
          font-weight: 700;
          font-size: 0.9rem;
          color: #111;
          margin: 0 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .carrito-item-precio {
          font-size: 0.82rem;
          color: #888;
          margin: 0;
          font-weight: 500;
        }
        .carrito-item-cop { font-size: 0.7rem; color: #bbb; margin-right: 2px; }
        .carrito-item-unit { font-size: 0.7rem; color: #ccc; }

        /* Cantidad */
        .carrito-item-qty {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .qty-btn {
          width: 32px; height: 32px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .qty-btn:hover:not(:disabled) { background: #f0f0f0; color: #111; }
        .qty-btn:disabled { color: #ddd; cursor: not-allowed; }
        .qty-num {
          min-width: 28px;
          text-align: center;
          font-weight: 700;
          font-size: 0.88rem;
          color: #111;
          border-left: 1px solid rgba(0,0,0,0.08);
          border-right: 1px solid rgba(0,0,0,0.08);
          line-height: 32px;
        }

        /* Subtotal */
        .carrito-item-subtotal {
          text-align: right;
          flex-shrink: 0;
        }
        .subtotal-label {
          font-size: 0.68rem;
          color: #bbb;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 2px;
          font-weight: 600;
        }
        .subtotal-valor {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: #111;
          letter-spacing: -0.02em;
          margin: 0;
        }

        /* Eliminar */
        .carrito-item-del {
          width: 34px; height: 34px;
          border-radius: 10px;
          border: 1.5px solid rgba(239,68,68,0.15);
          background: rgba(239,68,68,0.04);
          color: #ef4444;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .carrito-item-del:hover {
          background: rgba(239,68,68,0.12);
          border-color: rgba(239,68,68,0.35);
          transform: scale(1.08);
        }

        /* ── Resumen ── */
        .carrito-resumen {
          background: #fff;
          border-radius: 22px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          overflow: hidden;
          position: sticky;
          top: 84px;
        }
        .resumen-header {
          padding: 20px 22px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .resumen-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: #111;
          margin: 0;
        }
        .resumen-body {
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .resumen-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .resumen-label {
          font-size: 0.85rem;
          color: #888;
          font-weight: 500;
          margin: 0;
        }
        .resumen-valor {
          font-size: 0.88rem;
          font-weight: 700;
          color: #333;
          margin: 0;
        }
        .resumen-envio-gratis {
          font-size: 0.78rem;
          font-weight: 700;
          color: #10b981;
        }
        .resumen-sep {
          height: 1px;
          background: rgba(0,0,0,0.06);
          margin: 4px 0;
        }
        .resumen-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .resumen-total-label {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: #111;
          margin: 0;
        }
        .resumen-total-valor {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          color: #111;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .resumen-footer {
          padding: 0 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .btn-checkout {
          width: 100%;
          padding: 14px 0;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #111, #333);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(.22,.68,0,1.2);
          letter-spacing: 0.01em;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .btn-checkout:hover {
          background: linear-gradient(135deg, #000, #1a1a1a);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }
        .btn-checkout:active { transform: translateY(0); }
        .resumen-envio-nota {
          font-size: 0.74rem;
          color: #bbb;
          text-align: center;
          margin: 0;
          font-weight: 500;
        }

        /* ── Estado vacío ── */
        .carrito-vacio {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 80px 20px;
          text-align: center;
          animation: fadeUp 0.5s ease both;
        }
        .vacio-icon {
          width: 88px; height: 88px;
          border-radius: 50%;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ccc;
        }
        .vacio-titulo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: #111;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .vacio-sub {
          font-size: 0.9rem;
          color: #aaa;
          margin: 0;
          max-width: 300px;
          line-height: 1.6;
        }
        .btn-ir-articulos {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #111, #333);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .btn-ir-articulos:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.22);
        }

        /* ── Success checkout ── */
        .checkout-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 60px 20px;
          text-align: center;
          animation: fadeIn 0.4s ease both;
        }
        .success-icon {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          animation: checkPop 0.5s cubic-bezier(.22,.68,0,1.2) both,
                     successPulse 1.5s ease 0.5s infinite;
        }
        .success-titulo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: #111;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .success-sub {
          font-size: 0.9rem;
          color: #888;
          margin: 0;
          max-width: 320px;
          line-height: 1.65;
        }
      `}</style>

      <div className="carrito-inner">

        {/* ── Header ── */}
        <div className="carrito-header">
          <div>
            <h1 className="carrito-titulo">Mi Carrito</h1>
            <p className="carrito-sub">
              {totalItems > 0
                ? `${totalItems} producto${totalItems > 1 ? "s" : ""} seleccionado${totalItems > 1 ? "s" : ""}`
                : "Tu carrito está vacío"}
            </p>
            <div className="carrito-divider" style={{ marginTop: 12 }} />
          </div>
          {carrito.length > 0 && (
            <button className="carrito-vaciar" onClick={vaciarCarrito}>
              <DeleteOutlineIcon style={{ fontSize: 15 }} />
              Vaciar carrito
            </button>
          )}
        </div>

        {/* ── Checkout exitoso ── */}
        {checkout && (
          <div className="checkout-success">
            <div className="success-icon">
              <CheckCircleOutlineIcon style={{ fontSize: 40 }} />
            </div>
            <h2 className="success-titulo">¡Pedido realizado!</h2>
            <p className="success-sub">
              Tu pedido fue procesado exitosamente. Recibirás un correo de confirmación en breve.
            </p>
            <NavLink to="/Articulos" className="btn-ir-articulos">
              Seguir comprando <ArrowForwardIcon style={{ fontSize: 16 }} />
            </NavLink>
          </div>
        )}

        {/* ── Carrito con productos ── */}
        {!checkout && carrito.length > 0 && (
          <div className="carrito-body">

            {/* Lista */}
            <div className="carrito-lista">
              <div className="carrito-lista-header">
                <h3 className="carrito-lista-title">Productos</h3>
                <span className="carrito-count-chip">{totalItems}</span>
              </div>

              {carrito.map((item) => (
                <CarritoItem
                  key={item.nombre}
                  {...item}
                  onQuitarItem={quitarDelCarrito}
                  onCambiarCantidad={cambiarCantidad}
                />
              ))}
            </div>

            {/* Resumen */}
            <div className="carrito-resumen">
              <div className="resumen-header">
                <h3 className="resumen-title">Resumen del pedido</h3>
              </div>

              <div className="resumen-body">
                <div className="resumen-row">
                  <p className="resumen-label">Subtotal ({totalItems} ítem{totalItems > 1 ? "s" : ""})</p>
                  <p className="resumen-valor">COP ${totalPrecio.toLocaleString("es-CO")}</p>
                </div>
                <div className="resumen-row">
                  <p className="resumen-label">
                    Envío
                    {totalPrecio > 300000 && (
                      <span style={{ display: "block", fontSize: "0.7rem", color: "#10b981", marginTop: 2 }}>
                        Gratis por compras &gt; $300.000
                      </span>
                    )}
                  </p>
                  {envio === 0
                    ? <p className="resumen-envio-gratis">GRATIS</p>
                    : <p className="resumen-valor">COP ${envio.toLocaleString("es-CO")}</p>
                  }
                </div>

                <div className="resumen-sep" />

                <div className="resumen-total-row">
                  <p className="resumen-total-label">Total</p>
                  <p className="resumen-total-valor">COP ${total.toLocaleString("es-CO")}</p>
                </div>
              </div>

              <div className="resumen-footer">
                <button className="btn-checkout" onClick={handleCheckout}>
                  <LocalShippingOutlinedIcon style={{ fontSize: 18 }} />
                  Finalizar compra
                </button>
                <p className="resumen-envio-nota">
                  Pago 100% seguro · Devolución gratis en 30 días
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Carrito vacío ── */}
        {!checkout && carrito.length === 0 && (
          <div className="carrito-vacio">
            <div className="vacio-icon">
              <ShoppingCartOutlinedIcon style={{ fontSize: 40 }} />
            </div>
            <h2 className="vacio-titulo">Tu carrito está vacío</h2>
            <p className="vacio-sub">
              Explora nuestros productos y agrega los que más te gusten.
            </p>
            <NavLink to="/Articulos" className="btn-ir-articulos">
              Ver artículos <ArrowForwardIcon style={{ fontSize: 16 }} />
            </NavLink>
          </div>
        )}

      </div>
    </div>
  );
};

export default Carrito;
