const require = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const sightings = await db.any('Select * From sigthings');
    res.json(sightings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
