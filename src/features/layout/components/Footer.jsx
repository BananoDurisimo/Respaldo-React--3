import { Box, Typography, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Inicio",       path: "/" },
  { label: "Artículos",    path: "/Articulos" },
  { label: "Ofertas",      path: "/Ofertas" },
  { label: "Mi Cuenta",    path: "/Micuenta" },
  { label: "Favoritos",    path: "/Misfavoritos" },
  { label: "Carrito",      path: "/Carrito" },
];

const socials = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482
          0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462
          -.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832
          .092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683
          -.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59
          0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699
          1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852
          0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069
          1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058
          -1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265
          -.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057
          1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333
          0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24
          12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073
          -4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0
          5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0
          8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401
          6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161
          17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

const Footer = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

      .footer-link {
        text-decoration: none;
        color: rgba(255,255,255,0.42);
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        font-weight: 500;
        letter-spacing: 0.04em;
        transition: color 0.2s ease;
      }
      .footer-link:hover { color: rgba(255,255,255,0.85); }

      .social-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.1);
        color: rgba(255,255,255,0.45);
        text-decoration: none;
        transition: all 0.22s ease;
      }
      .social-btn:hover {
        color: #fff;
        border-color: rgba(255,255,255,0.3);
        background: rgba(255,255,255,0.07);
        transform: translateY(-2px);
      }
    `}</style>

    <Box
      component="footer"
      sx={{
        background: "rgba(6,6,6,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        mt: "auto",
      }}
    >
      {/* ── Cuerpo principal ── */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 3, md: 6 },
          pt: { xs: 5, md: 7 },
          pb: { xs: 4, md: 5 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1.6fr 1fr 1fr", md: "2fr 1fr 1fr" },
          gap: { xs: 5, md: 4 },
        }}
      >
        {/* ── Columna marca ── */}
        <Box>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: "8px",
              background: "linear-gradient(135deg, #fff 0%, #bbb 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Box sx={{ width: 13, height: 13, borderRadius: "3px", background: "#080808" }} />
            </Box>
            <Typography sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: "1.1rem",
              color: "#fff", letterSpacing: "-0.02em",
            }}>
              STOREX
            </Typography>
          </Box>

          <Typography sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem", color: "rgba(255,255,255,0.38)",
            lineHeight: 1.7, maxWidth: 280, mb: 3.5,
          }}>
            Tu destino para tecnología y lifestyle. Productos cuidadosamente seleccionados
            para elevar tu día a día.
          </Typography>

          {/* Sociales */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="social-btn" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </Box>
        </Box>

        {/* ── Columna navegación ── */}
        <Box>
          <Typography sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700, fontSize: "0.72rem",
            color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em",
            textTransform: "uppercase", mb: 2.5,
          }}>
            Navegación
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
            {links.map((l) => (
              <NavLink key={l.path} to={l.path} className="footer-link">
                {l.label}
              </NavLink>
            ))}
          </Box>
        </Box>

        {/* ── Columna info ── */}
        <Box>
          <Typography sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700, fontSize: "0.72rem",
            color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em",
            textTransform: "uppercase", mb: 2.5,
          }}>
            Contacto
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {[
              { label: "Soporte",  value: "soporte@storex.co" },
              { label: "Ventas",   value: "ventas@storex.co"  },
              { label: "Ciudad",   value: "Medellín, Colombia" },
              { label: "Horario",  value: "Lun–Vie · 8am–6pm" },
            ].map((item) => (
              <Box key={item.label}>
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem", color: "rgba(255,255,255,0.25)",
                  fontWeight: 600, letterSpacing: "0.06em",
                  textTransform: "uppercase", mb: 0.2,
                }}>
                  {item.label}
                </Typography>
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem", color: "rgba(255,255,255,0.5)",
                }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── Barra inferior ── */}
      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: 2.5,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.76rem", color: "rgba(255,255,255,0.22)",
          letterSpacing: "0.04em",
        }}>
          © 2026 STOREX · Todos los derechos reservados
        </Typography>
        <Typography sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem", color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.03em",
        }}>
          Diseñado y desarrollado por Vicente Rios
        </Typography>
      </Box>
    </Box>
  </>
);

export default Footer;
