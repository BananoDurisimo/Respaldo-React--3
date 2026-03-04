import { Routes, Route } from "react-router-dom";
import '../src/shared/styles/App.css'
import Content from '../src/features/layout/components/Content'
import Footer from '../src/features/layout/components/Footer'
import Header from '../src/features/layout/components/Header'
import Articulos from '../src/features/layout/components/Articulos'
import Ofertas from '../src/features/layout/components/Ofertas'
import Micuenta from '../src/features/layout/components/Micuenta'
import Misfavoritos from '../src/features/layout/components/Misfavoritos'

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/Articulos" element={<Articulos />} />
        <Route path="/Ofertas" element={<Ofertas />} />
        <Route path="/Micuenta" element={<Micuenta />} />
        <Route path="/Misfavoritos" element={<Misfavoritos />} />
      </Routes>
      <Footer></Footer>
      
    </>
  )
}

export default App
