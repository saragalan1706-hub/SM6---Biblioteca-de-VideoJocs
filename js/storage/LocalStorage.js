import { Videojuego } from "../classes/videojuego.js"; // Llama a la clase de Videojuegos

const CLAVE = "videojuego"; // Clave del codigo par aevitar confusiones

// Combierte el array en texto JSON.stringify(videojuegos)
// Y depues lo guarda en la clave localStorage.setItem(CLAVE, ...
export function guardarVideojuego(videojuegos){
    localStorage.setItem(CLAVE, JSON.stringify(videojuegos));
}

// Saca el texto y lo combierte en array
export function cargarVideojuego() {
    const datos = JSON.parse(localStorage.getItem(CLAVE)) || [];

    return datos.map(d => Object.assign(Object.create(Videojuego.prototype), d));
}