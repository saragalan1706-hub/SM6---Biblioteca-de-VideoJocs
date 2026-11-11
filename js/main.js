import { Videojuego } from "./classes/videojuego.js";
import { mostrarVideojuegos } from "./interfaz/interfaz.js";

const videojuego = []; // Array de videojuegos

// En referencia al html
const botonMostrar = document.getElementById("btnMostrarFormulario");
const formulario = document.getElementById("formularioContainer");
const form = document.getElementById("formVideojuego");

// Mostrar el formulario
botonMostrar.addEventListener("click", () => {
    formulario.hidden = false;
});

// Capturar submit - boton de guardar del html - guarda el juego
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que el formulario recargue la pagina
    
    // Busca el immput del formulario
    const titulo = document.getElementById("titulo").value;
    const genero = document.getElementById("genero").value;
    const empresa = document.getElementById("empresa").value;
    const tiempoJugado = document.getElementById("Horas jugadas").value;
    const valoracion = document.getElementById("valoracion").value;
    const portada = document.getElementById("portada").value;
    const juego = new videojuego(titulo, genero, empresa, tiempoJugado, valoracion, portada);

    videojuego.push(juego); // Guarda el juego nuevo en una Array
    
    mostrarVideojuegos(videojuego); // Muestra los juegos

    console.log(videojuego); // Muestra el contenido del Array en la consola
});

// Creacion de objeto videojuego
const juego = new Videojuego(titulo, genero, empresa, tiempoJugado, valoracion, portada);

// Añadir al array
videojuego.push(juego);

// Mostar por consola
console.log(videojuego);
