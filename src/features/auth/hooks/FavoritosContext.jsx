import React, { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (producto) => {
    setFavoritos((prev) => {
      const existe = prev.find((p) => p.nombre === producto.nombre);
      return existe
        ? prev.filter((p) => p.nombre !== producto.nombre)
        : [...prev, producto];
    });
  };

  const esFavorito = (nombre) => favoritos.some((p) => p.nombre === nombre);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => useContext(FavoritosContext);