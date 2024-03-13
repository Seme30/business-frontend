const express = require('express');
const cors = require('cors')
const routes = require('./routes');


const app = express();
app.use(cors());

app.use(routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
