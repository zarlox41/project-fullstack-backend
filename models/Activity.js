const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  interactivePayload: { type: Object, default: {} },
  status: { type: String, enum: ['pending','in-progress','completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ActivitySchema.pre('save', function(next){ this.updatedAt = Date.now(); next(); });

module.exports = mongoose.model('Activity', ActivitySchema);
