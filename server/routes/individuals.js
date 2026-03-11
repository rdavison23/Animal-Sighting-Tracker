const express = require('express');
const router = express.Router();
const db = require('../db/db-connection');

// GET all individuals
router.get('/', async (req, res) => {
  try {
    const individuals = await db.any('SELECT * FROM individuals ORDER BY id');
    res.json(individuals);
  } catch (err) {
    console.error('Error fetching individuals:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET one individual by :id
router.get('/:id', async (req, res) => {
  try {
    const individual = await db.oneOrNone(
      'SELECT * FROM individuals WHERE id = $1',
      [req.params.id]
    );

    if (!individual) {
      return res.status(404).json({ error: 'Individual not found' });
    }

    res.json(individual);
  } catch (err) {
    console.error('Error fetching individual:', err);
    res.status(500).json({ error: 'Failed to get individual' });
  }
});

module.exports = router;
