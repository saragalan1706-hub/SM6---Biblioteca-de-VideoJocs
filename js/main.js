import { Videojuego } from "./classes/videojuego.js";
import { mostrarVideojuegos } from "./interfaz/interfaz.js";
import { guardarVideojuego, cargarVideojuego } from "./storage/LocalStorage.js";

let videojuegos = cargarVideojuego(); // Cargamos los juegos guardados
mostrarVideojuegos(videojuegos); // Los pinta en la tabla

// Arrays que guardan jugeos
const historial = [];

// Busca en el HTML
const botonMostrar = document.getElementById("btnMostrarFormulario"); // Boton de añadir juegos
const formulario = document.getElementById("formularioContainer"); // Bloque del contenedor formulario
const form = document.getElementById("formVideojuego"); // Formulario de videojuegos
const biblioteca = document.getElementById("biblioteca"); // Seccion de la biblioteca

// ESTADISTICAS DEL INICIO
function actualizarEstadisticas() {
    const plataformas = new Map(); // Guarda las plataformas y las reptidas las cuenta
    const generosUnicos = new Set(); // No admite repetidos, solo escribe una vez

    // Recorre los juegos para hacer el Set y el Map
    for (const juego of videojuegos) {
        generosUnicos.add(juego.genero);
        plataformas.set(
            juego.plataforma,
            (plataformas.get(juego.plataforma) || 0) + 1
        );
    }

    
    const totalHoras = videojuegos.reduce((acc, j) => acc + j.tiempoJugado, 0); // Empieza en 0 enn cada vuelta suma las horas de cada juego

    // Escribe los resultados en la pagina
    document.getElementById("totalHoras").textContent = totalHoras;

    // Combierte el set en array muestra el genero  si no hay ninguno lo deja en null
    document.getElementById("generosUnicos").textContent =
        generosUnicos.size > 0 ? [...generosUnicos].join(", ") : "Ninguno";

    // Recorre el Map y serpar entre plataforma y cantidad
    let textoPlataformas = "";
    for (const [plataforma, cantidad] of plataformas) {
        textoPlataformas += `${plataforma}: ${cantidad}   `;
    }
    document.getElementById("plataformas").textContent =
        textoPlataformas || "Ninguna"; // Si esta vacio queda en niguna
}

actualizarEstadisticas();


// Mostrar formulario
botonMostrar.addEventListener("click", () => {
    formulario.hidden = false;
});

// Guardar un juego nuevo
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const juego = new Videojuego(
        document.getElementById("titulo").value,
        document.getElementById("genero").value,
        document.getElementById("empresa").value,
        document.getElementById("plataforma").value,
        Number(document.getElementById("tiempoJugado").value),
        Number(document.getElementById("valoracion").value),
        document.getElementById("portada").value
    );

    videojuegos.push(juego); // Añade un juego al final del array
    historial.push(`Añadido: ${juego.titulo}`); // Apunta una frase en el historial, por ejemplo "Añadido: Zelda"

    guardarVideojuego(videojuegos); // Guarda la lista completa en el localStorage
    mostrarVideojuegos(videojuegos); // Repinta la tabla con la lista actualizada
    actualizarEstadisticas(); // Recalcula los datos de resumen

    form.reset(); // Deja el formulario limpio 
    formulario.hidden = true; // Vacía todos los campos del formulario
});

// Borrar juegos con data-id, coge la fecha y le asigna un id
biblioteca.addEventListener("click", (e) => {
    if (!e.target.matches("button[data-id]")) return; 

    const id = Number(e.target.dataset.id);
    const juegoBorrado = videojuegos.find(j => j.id === id);

    videojuegos = videojuegos.filter(juego => juego.id !== id);

    if (juegoBorrado) {
        historial.push(`Borrado: ${juegoBorrado.titulo}`);
    }

    guardarVideojuego(videojuegos);
    mostrarVideojuegos(videojuegos);
    actualizarEstadisticas();
});

// Buscada el juego por le nombre
document.getElementById("btnBuscar").addEventListener("click", () => {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const resultado = videojuegos.filter(juego =>
        juego.titulo.toLowerCase().includes(texto)
    );
    mostrarVideojuegos(resultado);
});

// Ordenar por valoracion
document.getElementById("btnOrdenar").addEventListener("click", () => {
    const ordenados = [...videojuegos].sort(crearOrden("valoracion", "desc"));
    mostrarVideojuegos(ordenados);
});

function crearOrden(propiedad, orden = "desc") {
    const cuerpo = orden === "desc"
        ? `return b.${propiedad} - a.${propiedad};`
        : `return a.${propiedad} - b.${propiedad};`;

    return new Function("a", "b", cuerpo);
}