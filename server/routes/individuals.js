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

// POST create a new individual
router.post('/', async (req, res) => {
  const { name, species, age } = req.body;

  try {
    const newIndividual = await db.one(
      `INSERT INTO individuals (name, species, age)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, species, age]
    );

    res.status(201).json(newIndividual);
  } catch (err) {
    console.error('Error creating individual:', err);
    res.status(500).json({ error: 'Failed to create individual' });
  }
});
// PUT update an individual
router.put('/:id', async (req, res) => {
  const { name, species, age } = req.body;

  try {
    const updated = await db.oneOrNone(
      `UPDATE individuals
       SET name = $1, species = $2, age = $3
       WHERE id = $4
       RETURNING *`,
      [name, species, age, req.params.id]
    );

    if (!updated) {
      return res.status(404).json({ error: 'Individual not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating individual:', err);
    res.status(500).json({ error: 'Failed to update individual' });
  }
});

module.exports = router;
