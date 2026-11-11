export class Videojuego {
    constructor(titulo, genero, empresa, plataforma, tiempoJugado, valoracion, portada) {
        this.id = Date.now(); // Sirve para saver que juago borrar
        this.titulo = titulo;
        this.genero = genero;
        this.empresa = empresa;
        this.plataforma = plataforma;
        this.tiempoJugado = tiempoJugado;
        this.valoracion = valoracion;
        this.portada = portada;
    }

    // Combieret las valoraciones en estrellas
    estrellas() {
        return "★".repeat(this.valoracion) + "☆".repeat(5 - this.valoracion);
    }
}