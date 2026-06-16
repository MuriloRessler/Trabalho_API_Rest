const express = require('express');
const router  = express.Router();
const { version } = require('../../package.json');

router.get('/status', (req, res) => {
  res.json({
    versao: version,
    status: 'online',
    banco: 'MySQL',
    timestamp: new Date().toISOString(),
  });
});

router.get('/versao', (req, res) => {
  res.json({ versao: version, status: 'online' });
});

module.exports = router;