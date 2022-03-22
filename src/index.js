const express = require('express');
const cors = require('cors');
const insuranceRouter = require('./routers/insuranceRouter');


const port = process.env.PORT || 4000;
const app = express();


app.use(cors());
app.use(express.json());


app.use("/insurance", insuranceRouter);

app.use('*', async (req, res) => res.status(404).send({ message: "Page not found" }))


app.listen(port, () => console.log("Server is running on port:", port));