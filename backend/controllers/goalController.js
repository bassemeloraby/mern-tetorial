const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @des    Get goals
// @route  Get /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @des    set goals
// @route  post /api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(404);
    throw new Error('please provide a text');
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @des    update goal
// @route  put /api/goals
// @access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('goal not found');
  }
  const user = await User.findById(req.user.id);
  //Check if the user
  if (!user) {
    res.status(401);
    throw new Error('user not found');
  }
  //make sure the loged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @des    delete goal
// @route  delete /api/goals
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('goal not found');
  }
  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
