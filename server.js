require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activities');

const app = express();
app.use(express.json());

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
app.use(cors({ origin: FRONTEND_ORIGIN }));

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);

app.get('/', (req, res) => res.send({ ok: true, message: 'API running' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
