const express = require('express');
const cors = require('cors');

const sightingRouter = require('./routes/sightings');
const speciesRouter = require('./routers/species');
const individualsRouter = require('./routers/individuals');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/sightings', sightingRouter);
app.use('/speciesRouter', speciesRouter);
app.use('/individualsRouter', individualsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
