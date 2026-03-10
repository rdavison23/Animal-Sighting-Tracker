const express = require('express');
const router = express.Router();
const db = require('../db/db-connection');

//get all
router.get('/', async (req, res) => {
  try {
    const sightings = await db.any(
      'SELECT * FROM sigthings ORDER BY sighted-at DESC'
    );
    res.json(sightings);
  } catch (err) {
    console.log('Error fetching sightings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

//get sightings by :id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT
        sightings.*,
        individuals.nickname
      FROM sightings
      JOIN individuals
        ON sightings.individual_id = individuals.id
      WHERE sightings.id = $1;
    `;

    const sighting = await db.oneOrNone(query, [id]);

    if (!sighting) {
      return res.status(404).json({ error: 'Sighting not found' });
    }

    res.json(sighting);
  } catch (err) {
    console.error('Error fetching sighting:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
