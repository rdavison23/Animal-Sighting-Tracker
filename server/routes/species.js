const express = require('express');
const router = express.Router();
const db = require('../db/db-connection');

router.get('/', async (req, res) => {
  try {
    const species = await db.any('SELECT * FROM species ORDER BY id');
    res.json(species);
  } catch (err) {
    console.error('Error fetching species:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
