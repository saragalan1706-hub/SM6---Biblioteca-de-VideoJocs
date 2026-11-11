import { Videojuego } from "../classes/videojuego.js";

const CLAVE = "videojuego"; // El nombre de cajon donde se guarda la lista

export function guardarVideojuego(videojuegos){
    // localStorage solo guarda TEXTO, por eso convertimos el array con JSON.stringify
    localStorage.setItem(CLAVE, JSON.stringify(videojuegos));
}

export function cargarVideojuego() {
    // Si no hay nada guardado, getItem devuelve null y usamos [] (lista vacía)
    const datos = JSON.parse(localStorage.getItem(CLAVE)) || [];

    // JSON.parse devuelve objetos "planos" SIN los métodos de la clase (no tendrían estrellas()).
    // Object.create(Videojuego.prototype) crea un objeto vacío enlazado al prototipo de la clase
    // (así recupera sus métodos) y Object.assign le copia los datos guardados.
    // Además, esto es trabajar con prototipos, que pide la rúbrica.
    return datos.map(d => Object.assign(Object.create(Videojuego.prototype), d));
}