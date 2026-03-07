const express = require('express');
const app = express();

//configuracao para utilizar Json
app.use(express.json());

const PORT = process.env.PORT || 3006;

app.get('/', (req, res) => {
  res.json('Hello, World!');
});

app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`));