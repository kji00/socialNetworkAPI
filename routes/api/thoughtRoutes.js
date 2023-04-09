const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// GET and POST api route for /thoughts
router.route('/').get(getThoughts).post(createThought);
// GET, PUT and DELETE api route for thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// POST api route for /thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
// DELETE api route /thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;