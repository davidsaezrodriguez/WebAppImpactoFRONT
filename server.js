// Instalar servidor express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Usamos cors para permitir entrar a express a hacer consultas, ya que nos hace falta tanto para acceder a app como guardar imagenes
const cors = require('cors');
app.use(cors(
  [
    {
      origin: "http://localhost:4100/" // Ruta de localhost para que la api nos deje acceder desde el servidor de desarrollo
    },
    {
      origin: "https://webappimpactofront.herokuapp.com/" // Ruta de heroku para que la api nos deje acceder desde el servidor de produccion
    }
  ]
));

// Con body parser transformamos la respuesta post en json y para asi poder coger variable: valor eon rea.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir solo los archivos estáticos del directorio dist
app.use(express.static(__dirname + '/dist/WebAppImpactoFRONT'));
app.use(express.static(__dirname + '/src/assets/imagenes'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/WebAppImpactoFRONT/index.html'));
});
// Funciones para guardar imagenes al crear ejercicios en el directorio src/assets
multer = require("multer");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/assets/imagenes/ejercicios');
  },
  filename: (req, file, cb) => {
    cb(null,  file.originalname);
  }
});
var upload = multer({ storage });
app.post("/guardarImagen", upload.single('file'), (req, res) => {
  return res.send(req.file);
});
// Inicie la aplicación escuchando en el puerto predeterminado de Heroku
app.listen(process.env.PORT || 4200);
