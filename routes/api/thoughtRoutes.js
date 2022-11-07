const router = require('express').Router();

const { createThought, getThought, getThoughts, delThought, updateThought } = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getThought).put(updateThought).delete(delThought);

module.exports = router;