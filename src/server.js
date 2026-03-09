require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const express = require('express');
const app = express();
const router = require('./routes');

//configuracao para utilizar Json
app.use(express.json());

// Configuração do Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//consfiguracao de rota
app.use(router);

const PORT = process.env.PORT || 3006;


app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
})
