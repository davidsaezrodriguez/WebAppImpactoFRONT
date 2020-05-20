// Instalar servidor express
const express = require('express');
const path = require('path');

const app = express ();

// Servir solo los archivos estáticos del directorio dist
app.use(express.static(__dirname + '/dist/WebAppImpactoFRONT'));
app.use(express.static(__dirname + '/src/assets/imagenes'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/WebAppImpactoFRONT/index.html'));
});

// Inicie la aplicación escuchando en el puerto predeterminado de Heroku
app.listen(process.env.PORT || 4200);