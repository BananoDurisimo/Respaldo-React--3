import { Routes, Route } from "react-router-dom";
import '../src/shared/styles/App.css'
import Content from '../src/features/layout/components/Content'
import Footer from '../src/features/layout/components/Footer'
import Header from '../src/features/layout/components/Header'
import Articulos from '../src/features/articles/components/Articulos'
import Ofertas from '../src/features/articles/components/Ofertas'
import Micuenta from './features/auth/components/Micuenta'
import Misfavoritos from './features/auth/components/Misfavoritos'
import Carrito from './features/auth/components/Carrito'
import { FavoritosProvider } from "./features/auth/hooks/FavoritosContext";
import { CarritoProvider } from "./features/articles/hooks/CarritoContext";
import Login  from './features/auth/components/Login'
import Registro from './features/auth/components/Registro'

function App() {
  return (
    <>
    <CarritoProvider>
    <FavoritosProvider>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/Articulos" element={<Articulos />} />
        <Route path="/Ofertas" element={<Ofertas />} />
        <Route path="/Micuenta" element={<Micuenta />} />
        <Route path="/Misfavoritos" element={<Misfavoritos />} />
        <Route path="/Login"   element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Carrito" element={<Carrito />} />
      </Routes>
      <Footer></Footer>
    </FavoritosProvider>
    </CarritoProvider>
    </>
  )
}

export default App
