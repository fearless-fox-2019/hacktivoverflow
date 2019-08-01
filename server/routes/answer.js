const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers/answer-controller');
const authenticate = require('../middlewares/authenticate');

router.get('/', AnswerController.findAll);
router.get('/:QuestionId', AnswerController.findBelongs);
router.post('/:QuestionId', authenticate, AnswerController.create);
router.get('/:id', AnswerController.findOne);
router.patch('/:id', authenticate, AnswerController.update);
router.patch('/vote/:AnswerId/:voteType', authenticate, AnswerController.updateVote);
router.delete('/:id', AnswerController.delete);

module.exports = router;