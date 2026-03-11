# STOREX — Tienda de Tecnología

Aplicación web de e-commerce desarrollada con React 19 y Vite, que simula una tienda de productos tecnológicos con sistema de autenticación, carrito de compras, favoritos y galería de productos con filtrado por categoría.

---

## Descripción

STOREX es una Single Page Application (SPA) que reproduce el flujo completo de una tienda en línea: el usuario puede registrarse, iniciar sesión, explorar productos, agregarlos al carrito o a favoritos, gestionar su perfil y finalizar una compra. Además, la sección **Ofertas** actúa como una guía interactiva de los principales React Hooks.

---

## Características principales

### Autenticación
- Registro de usuarios con validación de campos
- Inicio de sesión con verificación contra datos almacenados
- Sesión persistida en `localStorage` (`storex_sesion`)
- Cierre de sesión desde el Header y desde Mi Cuenta
- Navegación condicional: muestra Login/Registro si no hay sesión activa, o Mi Cuenta/Favoritos si la hay

### Catálogo de productos
- 6 productos con imagen, precio en COP, descripción y badge de categoría
- Filtrado por categoría: Todos, Gaming, Laptops, Audio, Wearables, Hogar
- Animación de entrada con `IntersectionObserver` al hacer scroll

### Carrito de compras
- Agregar productos con feedback visual de confirmación
- Aumentar / disminuir cantidad por producto
- Eliminar productos individuales o vaciar el carrito completo
- Cálculo automático de subtotal, envío y total
- Envío gratis en compras mayores a $300.000 COP
- Flujo de checkout con animación de éxito

### Favoritos
- Toggle de favorito desde cualquier tarjeta de producto (Artículos y Favoritos)
- Lista de productos guardados con acceso a carrito desde la misma página
- Badge con conteo de favoritos en el link de navegación

### Mi Cuenta
- Muestra nombre e iniciales del usuario activo tomados de `localStorage`
- Tabs de navegación interna: Resumen, Pedidos, Direcciones, Pagos
- Modo edición de datos personales
- Botón de cierre de sesión

### Hooks interactivos (Ofertas)
Demostraciones en vivo de: `useState`, `useEffect`, `useContext`, `useRef`, `useReducer`, `useCallback`, `useMemo` y un Hook personalizado.

---

## Interfaz gráfica

| Sección | Descripción visual |
|---|---|
| **Hero / Inicio** | Fondo oscuro `#080808` con texto animado en degradado, blobs flotantes y grid de puntos decorativo |
| **Header** | Barra fija con efecto glassmorphism al hacer scroll, navegación responsiva con Drawer en móvil, saludo al usuario y badges de carrito/favoritos |
| **Artículos** | Fondo claro `#fafafa → #efefef`, grid de 3 columnas, tarjetas blancas con hover elevado |
| **Carrito** | Layout de 2 columnas: lista de productos + panel de resumen sticky |
| **Favoritos** | Grid responsivo con las mismas tarjetas del catálogo |
| **Mi Cuenta** | Hero con avatar, estadísticas y panel con tabs laterales |
| **Footer** | Fondo oscuro con 3 columnas: marca + descripción, navegación y contacto |

**Tipografía:** Syne (títulos, 700–800) y DM Sans (cuerpo, 400–800) vía Google Fonts.
**Paleta base:** `#080808` oscuro · `#fff` blanco · `#111/333` grises · `#ef4444` rojo de acción.

---

## Arquitectura del Proyecto

```
src/
├── App.jsx                          # Rutas, providers globales
├── main.jsx                         # Punto de entrada
│
├── shared/
│   └── styles/
│       └── App.css                  # Reset global de estilos
│
└── features/
    │
    ├── layout/                      # Estructura de la aplicación
    │   └── components/
    │       ├── Header.jsx           # Barra de navegación global
    │       ├── Footer.jsx           # Pie de página
    │       └── Content.jsx          # Página Hero (ruta "/")
    │
    ├── articles/                    # Módulo de productos
    │   ├── components/
    │   │   ├── Articulos.jsx        # Catálogo con filtros (ruta "/Articulos")
    │   │   └── Ofertas.jsx          # Demo de Hooks (ruta "/Ofertas")
    │   └── hooks/
    │       ├── CarritoContext.jsx   # Context + Provider del carrito
    │       ├── HookCard.jsx         # Tarjeta base para demos de hooks
    │       ├── HookUseState.jsx
    │       ├── HookUseEffect.jsx
    │       ├── HookUseContext.jsx
    │       ├── HookUseRef.jsx
    │       ├── HookUseReducer.jsx
    │       ├── HookUseCallback.jsx
    │       ├── HookUseMemo.jsx
    │       └── HookCustom.jsx
    │
    └── auth/                        # Módulo de autenticación y usuario
        ├── components/
        │   ├── Login.jsx            # Inicio de sesión (ruta "/Login")
        │   ├── Registro.jsx         # Registro de usuario (ruta "/Registro")
        │   ├── Micuenta.jsx         # Perfil de usuario (ruta "/Micuenta")
        │   ├── Misfavoritos.jsx     # Lista de favoritos (ruta "/Misfavoritos")
        │   └── Carrito.jsx          # Carrito de compras (ruta "/Carrito")
        └── hooks/
            └── FavoritosContext.jsx # Context + Provider de favoritos
```

### Providers globales

```
<CarritoProvider>
  <FavoritosProvider>
    <Header />
    <Routes />
    <Footer />
  </FavoritosProvider>
</CarritoProvider>
```

### Persistencia (localStorage)

| Clave | Contenido |
|---|---|
| `storex_sesion` | `{ nombre, email, password }` — sesión activa |
| `storex_usuarios` | `Array<{ nombre, email, password }>` — usuarios registrados |

### Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.2 | UI y gestión de estado |
| Vite | 7.3 | Bundler y servidor de desarrollo |
| React Router DOM | 7.13 | Navegación SPA |
| Material UI (MUI) | 7.3 | Componentes y sistema de diseño |
| MUI Icons Material | 7.3 | Iconografía |
| Emotion | 11.14 | CSS-in-JS (motor de MUI) |

### Instalación y uso

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

---

## Datos del Autor

| | |
|---|---|
| **Nombre** | Vicente Rios |
| **Competencia** | React |
| **Trimestre** | 3 |
| **Ciudad** | Medellín, Colombia |
| **Año** | 2026 |


