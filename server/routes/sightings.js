const express = require('express');
const router = express.Router();
const db = require('../db/db-connection');

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

module.exports = router;
