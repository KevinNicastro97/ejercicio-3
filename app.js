const express = require('express');

const app = express();

const animales = [
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

app.listen(3000, () => {
    console.log('Servidor Express iniciado en el puerto 3000');
});