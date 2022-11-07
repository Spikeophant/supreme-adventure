const router = require('express').Router();

const { createThought, getThought, getThoughts, delThought, updateThought, addReaction } = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getThought).put(updateThought).delete(delThought);

router.route('/:id/reactions').post(addReaction).delete();

module.exports = router;