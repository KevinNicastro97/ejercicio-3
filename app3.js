const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

let animales = [
    { nombre: "Luna", edad: 3, tipo: "Gato" },
    { nombre: "Max", edad: 5, tipo: "Perro" },
    { nombre: "Simba", edad: 2, tipo: "León" }
];

function generarHTMLAnimales() {
    let html = '<h1>Lista de Animales</h1>';
    html += '<ul>';
    animales.forEach(animal => {
        html += `<li>Nombre: ${animal.nombre}, Edad: ${animal.edad}, Tipo: ${animal.tipo}</li>`;
    });
    html += '</ul>';
    return html;
}

app.get('/', (req, res) => {
    const html = generarHTMLAnimales();
    res.send(html);
});

app.get('/dejar-animal', (req, res) => {
    const formulario = `
        <h1>Dejar Animal</h1>
        <form action="/sumar-animal" method="post">
            <label for="nombre">Nombre:</label><br>
            <input type="text" id="nombre" name="nombre"><br>
            <label for="tipo">Tipo:</label><br>
            <input type="text" id="tipo" name="tipo"><br>
            <label for="edad">Edad:</label><br>
            <input type="number" id="edad" name="edad"><br><br>
            <input type="submit" value="Enviar">
        </form>
    `;
    res.send(formulario);
});

app.post('/sumar-animal', (req, res) => {
    const { nombre, tipo, edad } = req.body;

    if (!nombre || !tipo || !edad) {
        return res.status(400).send('Se deben proporcionar nombre, tipo y edad del animal.');
    }

    const nuevoAnimal = { nombre, tipo, edad: parseInt(edad) };

    animales.push(nuevoAnimal);

    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Servidor Express iniciado en el puerto 3000');
});