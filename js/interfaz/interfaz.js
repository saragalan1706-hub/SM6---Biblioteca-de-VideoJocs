// Pinta en la página todos los juegos que reciba
export function mostrarVideojuegos(videojuegos) {
    const biblioteca = document.getElementById("biblioteca");
    biblioteca.innerHTML = ""; // vaciamos para no duplicar tarjetas

    videojuegos.forEach(juego => {
        // Uso createElement + textContent en vez de innerHTML con ${...}:
        // así, si alguien escribe código HTML en el título, se ve como texto y no se ejecuta.
        const tarjeta = document.createElement("article");

        const portada = document.createElement("img");
        portada.src = "img/" + juego.portada;
        portada.alt = juego.titulo;
        portada.width = 150;

        const titulo = document.createElement("h3");
        titulo.textContent = juego.titulo;

        const detalles = document.createElement("p");
        detalles.textContent =
            `${juego.genero} · ${juego.empresa} · ${juego.plataforma} · ${juego.tiempoJugado} h`;

        const estrellas = document.createElement("p");
        estrellas.textContent = juego.estrellas();

        const btnBorrar = document.createElement("button");
        btnBorrar.textContent = "Borrar";
        // data-id guarda el id del juego dentro del propio botón; luego main.js lo leerá
        btnBorrar.dataset.id = juego.id;

        tarjeta.append(portada, titulo, detalles, estrellas, btnBorrar);
        biblioteca.appendChild(tarjeta);

    });
}