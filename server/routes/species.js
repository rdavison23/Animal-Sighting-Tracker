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
// POST /species
router.post('/', async (req, res) => {
  const {
    common_name,
    scientific_name,
    estimated_population,
    conservation_status,
  } = req.body;

  // Validate required fields
  if (!common_name || !scientific_name) {
    return res
      .status(400)
      .json({ error: 'common_name and scientific_name are required.' });
  }

  try {
    const query = `
        INSERT INTO species (common_name, scientific_name, estimated_population, conservation_status, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING *;
      `;

    const values = [
      common_name,
      scientific_name,
      estimated_population || null,
      conservation_status || null,
    ];

    const [newSpecies] = await db.any(query, values);

    res.status(201).json(newSpecies);
  } catch (err) {
    console.error('Error creating species:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT species by :id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    common_name,
    scientific_name,
    estimated_population,
    conservation_status,
  } = req.body;

  // Validate required fields
  if (!common_name || !scientific_name) {
    return res
      .status(400)
      .json({ error: 'common_name and scientific_name are required.' });
  }

  try {
    const query = `
        UPDATE species
        SET common_name = $1,
            scientific_name = $2,
            estimated_population = $3,
            conservation_status = $4
        WHERE id = $5
        RETURNING *;
      `;

    const values = [
      common_name,
      scientific_name,
      estimated_population || null,
      conservation_status || null,
      id,
    ];

    const updated = await db.oneOrNone(query, values);

    if (!updated) {
      return res.status(404).json({ error: 'Species not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating species:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
