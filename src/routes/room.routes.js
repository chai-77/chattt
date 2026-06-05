const express = require('express');
const authMiddleware = require("../middleware/auth.middleware")
const isMemberMiddleware = require("../middleware/isMember.middleware")
const roomController = require('../controllers/room.controller');


const router = express.Router();


router.get('/', authMiddleware, roomController.listRoomsController ); 

router.get('/:id', authMiddleware, isMemberMiddleware,roomController.getRoomByIdController) ;

router.post('/create', authMiddleware, roomController.createRoomController );



module.exports = router;