const express = require('express');
const router = express.Router();
const db = require('../db/db-connection');

//GET all /individuals
router.get('/', async (req, res) => {
  try {
    const individuals = await db.any('SELECT * FROM individuals ORDER BY id');
    res.json(individuals);
  } catch (err) {
    console.error('Error fetching individuals:', err);
    res.status(500).json({ error: 'Failed to fetch individuals' });
  }
});
// GET summary
router.get('/summary', async (req, res) => {
  try {
    const query = `
      SELECT 
        i.id,
        i.nickname,
        i.scientist_name,
        i.species_id,
        COUNT(s.id) AS sighting_count,
        MIN(s.sighted_at) AS first_sighting,
        MAX(s.sighted_at) AS last_sighting
      FROM individuals i
      LEFT JOIN sightings s
        ON i.id = s.individual_id
      GROUP BY i.id
      ORDER BY i.id;
    `;

    const results = await db.any(query);
    res.json(results);
  } catch (err) {
    console.error('Error fetching individual summary:', err);
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
  const { nickname, scientist_name, species_id } = req.body;

  // Validate required fields
  if (!nickname || !species_id) {
    return res.status(400).json({
      error: 'nickname and species_id are required.',
    });
  }

  try {
    const newIndividual = await db.one(
      `INSERT INTO individuals (nickname, scientist_name, species_id, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [nickname, scientist_name || null, species_id]
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

// DELETE an individual
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.oneOrNone(
      'DELETE FROM individuals WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (!deleted) {
      return res.status(404).json({ error: 'Individual not found' });
    }

    res.json({ message: 'Individual deleted', deleted });
  } catch (err) {
    console.error('Error deleting individual:', err);
    res.status(500).json({ error: 'Failed to delete individual' });
  }
});

module.exports = router;
