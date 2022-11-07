const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('What you pokin around for there partner?  Best check for that ol snake in yer boot there.');
});

module.exports = router;