const express = require('express');
const cors = require('cors');

const sightingsRouter = require('./routes/sightings');
const speciesRouter = require('./routes/species');
const individualsRouter = require('./routes/individuals');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/sightings', sightingsRouter);
app.use('/species', speciesRouter);
app.use('/individuals', individualsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
