import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = () => {
    const { email, password } = form;

    if (!email || !password) {
      setError("Completa todos los campos.");
      return;
    }

    // Buscar usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem("storex_usuarios") || "[]");
    const usuario  = usuarios.find(u => u.email === email && u.password === password);

    if (!usuario) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    // Guardar sesión activa
    localStorage.setItem("storex_sesion", JSON.stringify(usuario));
    navigate("/");
  };

  const inputSx = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.9rem",
      color: "#fff",
      background: "rgba(255,255,255,0.05)",
      "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
      "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.6)" },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.85rem",
      color: "rgba(255,255,255,0.4)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "rgba(255,255,255,0.7)",
    },
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .login-card { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both; }
      `}</style>

      <Box sx={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        position: "relative",
        overflow: "hidden"
      }}>

        {/* Blob decorativo */}
        <Box sx={{
          position: "absolute", top: "10%", left: "10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          filter: "blur(50px)", pointerEvents: "none"
        }} />
        <Box sx={{
          position: "absolute", bottom: "5%", right: "8%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none"
        }} />

        {/* Dot grid */}
        <Box sx={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          pointerEvents: "none"
        }} />

        {/* Card */}
        <Box className="login-card" sx={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(8,8,8,0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "24px",
          p: { xs: 3.5, md: 5 },
          position: "relative",
          zIndex: 1
        }}>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: "8px",
              background: "linear-gradient(135deg, #fff 0%, #aaa 100%)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Box sx={{ width: 14, height: 14, borderRadius: "3px", background: "#080808" }} />
            </Box>
            <Typography sx={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.02em"
            }}>
              STOREX
            </Typography>
          </Box>

          {/* Título */}
          <Typography sx={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "1.7rem", color: "#fff",
            letterSpacing: "-0.03em", mb: 0.8
          }}>
            Bienvenido de nuevo
          </Typography>
          <Typography sx={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
            color: "rgba(255,255,255,0.4)", mb: 4, lineHeight: 1.6
          }}>
            Inicia sesión para continuar
          </Typography>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{
              mb: 2.5, borderRadius: "10px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
              background: "rgba(239,68,68,0.12)", color: "#fca5a5",
              border: "1px solid rgba(239,68,68,0.2)",
              "& .MuiAlert-icon": { color: "#fca5a5" }
            }}>
              {error}
            </Alert>
          )}

          {/* Campos */}
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
            sx={inputSx}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            sx={inputSx}
          />

          {/* Botón */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 1, py: 1.5, borderRadius: "12px",
              background: "#fff", color: "#080808",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "0.9rem", textTransform: "none",
              boxShadow: "0 0 30px rgba(255,255,255,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "#f0f0f0",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(255,255,255,0.15)"
              }
            }}
          >
            Iniciar sesión
          </Button>

          {/* Divider */}
          <Box sx={{
            display: "flex", alignItems: "center", gap: 2, my: 3
          }}>
            <Box sx={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
            <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
              ¿No tienes cuenta?
            </Typography>
            <Box sx={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
          </Box>

          {/* Link registro */}
          <Button
            fullWidth
            component={NavLink}
            to="/Registro"
            variant="outlined"
            sx={{
              py: 1.4, borderRadius: "12px",
              borderColor: "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: "0.88rem", textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.35)",
                color: "#fff",
                background: "rgba(255,255,255,0.05)"
              }
            }}
          >
            Crear cuenta
          </Button>

        </Box>
      </Box>
    </>
  );
};

export default Login;
