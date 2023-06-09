const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));

// app.use(
//   cors({
//     origin: [
//         "*",
//         "http://localhost:3000"
//     ],
//     credentials: true,
//   }),
// );

const routers = require('./routers/index.js');

app.use('/api', routers)

app.listen(4000, () => {
  console.log('back server port 4000');
});
