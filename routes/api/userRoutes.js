// User Routes Configuration
const router = require('express').Router();
const userController = require('../../controllers/userController');
 
// User Routes
router.get('/', userController.getUsers);  
router.post('/', userController.createUser); 
router.get('/:userId', userController.getUserById); 
router.put('/:userId', userController.updateUser); 
router.delete('/:userId', userController.deleteUser);

// Friend Routes
router.post('/:userId/friends/:friendId', userController.addNewFriend);
router.delete('/:userId/friends/:friendId', userController.deleteFriend);

module.exports = router;