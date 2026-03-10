const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Activity = require('../models/Activity');

// Create activity
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, interactivePayload, status } = req.body;
    const activity = new Activity({
      user: req.user.id,
      title, description, interactivePayload, status
    });
    await activity.save();
    res.json(activity);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// Get all activities for user
router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(activities);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// Get one
router.get('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id, user: req.user.id });
    if(!activity) return res.status(404).json({ error: 'Not found' });
    res.json(activity);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if(!activity) return res.status(404).json({ error: 'Not found' });
    res.json(activity);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if(!activity) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
