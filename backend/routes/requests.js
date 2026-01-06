const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Comment = require('../models/Comment');

// POST /requests - Create a new request
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const request = new Request({ title, description });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /requests - List all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /requests/:id - Get request details
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    const comments = await Comment.find({ requestId: req.params.id }).sort({ createdAt: 1 });
    res.json({ ...request.toObject(), comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /requests/:id/comment - Add a comment
router.post('/:id/comment', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Comment text required' });
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    const comment = new Comment({ requestId: req.params.id, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /requests/:id/status - Update request status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['open', 'in_progress', 'closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
