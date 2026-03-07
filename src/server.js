const express = require('express');
const app = express();
const router = require('./routes');

//configuracao para utilizar Json
app.use(express.json());

//consfiguracao de rota
app.use(router);

const PORT = process.env.PORT || 3006;


app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`));