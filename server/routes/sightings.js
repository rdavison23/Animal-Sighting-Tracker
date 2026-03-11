const express = require('express');
const router = express.Router();
const db = require('../db/db-connection');

// GET all sighting
router.get('/', async (req, res) => {
  try {
    const sightings = await db.any(
      'SELECT * FROM sightings ORDER BY sighted_at DESC'
    );
    res.json(sightings);
  } catch (err) {
    console.log('Error fetching sightings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET sighting by :id
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

// post sighting
router.post('/', async (req, res) => {
  const { individual_id, sighted_at, location, healthy, email } = req.body;

  if (!individual_id || !sighted_at || !location || !email) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const query = `
      INSERT INTO sightings (individual_id, sighted_at, location, healthy, email, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *;
    `;

    const values = [individual_id, sighted_at, location, healthy, email];

    const [newSighting] = await db.any(query, values);

    res.status(201).json(newSighting);
  } catch (err) {
    console.error('Error creating sighting:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE sighting by :id

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { individual_id, sighted_at, location, healthy, email } = req.body;

  if (!individual_id || !sighted_at || !location || !email) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const query = `
      UPDATE sightings
      SET individual_id = $1,
          sighted_at = $2,
          location = $3,
          healthy = $4,
          email = $5
      WHERE id = $6
      RETURNING *;
    `;

    const values = [individual_id, sighted_at, location, healthy, email, id];

    const updated = await db.oneOrNone(query, values);

    if (!updated) {
      return res.status(404).json({ error: 'Sighting not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating sighting:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE sighting by :id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM sightings
      WHERE id = $1
      RETURNING *;
    `;

    const deleted = await db.oneOrNone(query, [id]);

    if (!deleted) {
      return res.status(404).json({ error: 'Sighting not found' });
    }

    res.json({ message: 'Sighting deleted', deleted });
  } catch (err) {
    console.error('Error deleting sighting:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
