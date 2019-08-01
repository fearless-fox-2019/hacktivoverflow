const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/question-controller');
const authenticate = require('../middlewares/authenticate');

router.get('/', QuestionController.findAll);
router.get('/user', authenticate, QuestionController.findBelongs);
router.get('/:id', QuestionController.findOne);
router.patch('/:id', authenticate, QuestionController.update);
router.post('/ask', authenticate, QuestionController.create);
router.patch('/vote/:QuestionId/:voteType', authenticate, QuestionController.updateVote);
router.delete('/:id', QuestionController.delete);

module.exports = router;