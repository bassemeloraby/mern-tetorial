const asyncHandler = require('express-async-handler')

// @des    Get goals
// @route  Get /api/goals
// @access private
const getGoals = asyncHandler(async(req, res) => {
  res.status(200).json({ message: 'get goals' });
});

// @des    set goals
// @route  post /api/goals
// @access private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
      res.status(404)
      throw new Error('please provide a text')
    }
    

  res.status(200).json({ message: 'set goal' });
});

// @des    update goal
// @route  put /api/goals
// @access private
const updateGoal = asyncHandler(async(req, res) => {
  res.status(200).json({ message: `update goal ${req.params.id}` });
});

// @des    delete goal
// @route  delete /api/goals
// @access private
const deleteGoal = asyncHandler(async(req, res) => {
  res.status(200).json({ message: `delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
};
