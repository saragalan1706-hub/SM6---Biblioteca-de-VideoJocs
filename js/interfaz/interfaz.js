// Mustra todos los videojuegos via web
export function mostrarVideojuegos(videojuego) {
    const biblioteca = document.getElementById("biblioteca");

    biblioteca.innerHTML = ""; // Limpia el contenido anteriro

    // Recorrer el array de videojuegos
    videojuego.forEach(juego => {
        biblioteca.innerHTML += `
            <div>
                <h3>${juego.titulo}</h3>
            </div>
            `;
    });
}