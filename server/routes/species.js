const express = require('express');
const router = express.Router();
const db = require('../db/db-connection');

//GEt species
router.get('/', async (req, res) => {
  try {
    const species = await db.any('SELECT * FROM species ORDER BY id');
    res.json(species);
  } catch (err) {
    console.error('Error fetching species:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET species :id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const species = await db.oneOrNone('SELECT * FROM species WHERE id = $1', [
      id,
    ]);

    if (!species) {
      return res.status(404).json({ error: 'Species not found' });
    }

    res.json(species);
  } catch (err) {
    console.error('Error fetching species:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
