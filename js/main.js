import { Videojuego } from "./classes/videojuego.js";
import { mostrarVideojuegos } from "./interfaz/interfaz.js";
import { guardarVideojuego, cargarVideojuego } from "./storage/LocalStorage.js";

// "let" porque al borrar vamos a reasignar el array. Arrancamos con lo que haya guardado.
let videojuegos = cargarVideojuego();
mostrarVideojuegos(videojuegos);

// Referencias al HTML
const botonMostrar = document.getElementById("btnMostrarFormulario");
const formulario = document.getElementById("formularioContainer");
const form = document.getElementById("formVideojuego");
const biblioteca = document.getElementById("biblioteca");

botonMostrar.addEventListener("click", () => {
    formulario.hidden = false;
});

// Guardar un juego nuevo
form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita que la página se recargue

    // Leemos los valores AQUÍ DENTRO: es cuando el usuario ya los ha escrito.
    // Number() porque un input siempre da texto y valoración/horas deben ser números.
    const juego = new Videojuego(
        document.getElementById("titulo").value,
        document.getElementById("genero").value,
        document.getElementById("empresa").value,
        document.getElementById("plataforma").value,
        Number(document.getElementById("tiempoJugado").value),
        Number(document.getElementById("valoracion").value),
        document.getElementById("portada").value
    );

    videojuegos.push(juego);
    guardarVideojuego(videojuegos);   // guardamos cada vez que cambia la lista
    mostrarVideojuegos(videojuegos);

    form.reset();
    formulario.hidden = true;
});

// Borrar: UN solo listener en el contenedor en vez de uno por botón.
// Los clics "burbujean" hacia arriba (propagación), así que el contenedor se entera
// del clic en cualquier botón hijo. Esto se llama delegación de eventos y funciona
// también con las tarjetas que se creen más tarde.
biblioteca.addEventListener("click", (e) => {
    if (!e.target.matches("button[data-id]")) return; // ¿era un botón de borrar?

    const id = Number(e.target.dataset.id); // dataset siempre da texto, lo pasamos a número
    videojuegos = videojuegos.filter(juego => juego.id !== id); // nos quedamos con todos MENOS ese
    guardarVideojuego(videojuegos);
    mostrarVideojuegos(videojuegos);
});

// Buscador
document.getElementById("btnBuscar").addEventListener("click", () => {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const resultado = videojuegos.filter(juego => juego.titulo.toLowerCase().includes(texto));
    mostrarVideojuegos(resultado);
});

// Ordenar por valoración
document.getElementById("btnOrdenar").addEventListener("click", () => {
    // [...videojuegos] hace una copia: sort() modifica el array original
    // y no queremos cambiar el orden guardado, solo el orden en pantalla.
    const ordenados = [...videojuegos].sort((a, b) => b.valoracion - a.valoracion);
    mostrarVideojuegos(ordenados); // el paso que te faltaba
});