// routes/queryRoutes.js
const express = require('express');
const Query = require('../models/Query.js');
const router = express.Router();

// Create a new query
router.post('/', async (req, res) => {
    const newQuery = new Query(req.body);
    try {
        const savedQuery = await newQuery.save();
        res.status(201).json(savedQuery);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all queries
// routes/queryRoutes.js
router.get('/', async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
        res.status(200).json(queries);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a query
router.put('/:id', async (req, res) => {
    try {
        const updatedQuery = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedQuery);
    } catch (err) {
        res.status(500).json(err);
    }
});


// routes/queryRoutes.js
router.delete('/:id', async (req, res) => {
    try {
        await Query.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Query deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});
// Add a comment to a query
router.post('/:id/comments', async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        query.comments.push(req.body); // Add the new comment to the comments array
        const updatedQuery = await query.save(); // Save the updated query
        res.status(200).json(updatedQuery); // Return the updated query
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;