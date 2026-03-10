const express = require('express');
const router = express.Router();
const db = require('../db/db-connection');

router.get('/', async (req, res) => {
  try {
    const individuals = await db.any('SELECT * FROM individuals ORDER BY id ');
    res.json(individuals);
  } catch (err) {
    console.error('Error fetching individuals:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

module.exports = router;
