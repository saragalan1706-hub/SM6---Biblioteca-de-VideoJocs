export function mostrarVideojuegos(videojuegos) { // Permite que la main la use con import
    const biblioteca = document.getElementById("biblioteca"); // Busca <section id="biblioteca"> del HTML
    biblioteca.innerHTML = ""; // Vacia antes de pintar

    // Si no hay juegos añadidos sale el siguente texto
    if (videojuegos.length === 0) {
        biblioteca.innerHTML = "<p>No hay videojuegos para mostrar.</p>";
        return;
    }

    // Crea la tabla en memoria
    const tabla = document.createElement("table");
    tabla.border = "1";
    tabla.style.width = "100%";
    tabla.style.borderCollapse = "collapse";
    tabla.style.textAlign = "center";

    // Crea la cabecera de la tabla 
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Portada</th>
            <th>Título</th>
            <th>Género</th>
            <th>Empresa</th>
            <th>Plataforma</th>
            <th>Horas</th>
            <th>Valoración</th>
            <th>Acción</th>
        </tr>
    `;
    tabla.appendChild(thead);

    // El cuerpo de la tabla y una fila por cada juego con el bucle for
    const tbody = document.createElement("tbody");

    videojuegos.forEach(juego => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td><img src="img/${juego.portada}" alt="${juego.titulo}" width="80"></td>
            <td>${juego.titulo}</td>
            <td>${juego.genero}</td>
            <td>${juego.empresa}</td>
            <td>${juego.plataforma}</td>
            <td>${juego.tiempoJugado} h</td>
            <td>${juego.estrellas()}</td>
            <td><button data-id="${juego.id}">Borrar</button></td>
        `;

        tbody.appendChild(fila);
    });

    // Se cuelga en la pagina, no se queda en el aire
    tabla.appendChild(tbody);
    biblioteca.appendChild(tabla);
}