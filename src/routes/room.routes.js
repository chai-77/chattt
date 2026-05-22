const express = require('express');
const authMiddleware = require("../middleware/auth.middleware")
const roomController = require('../controllers/room.controller');


const router = express.Router();


router.get('/', authMiddleware, roomController.listRoomsController ); 

router.get('/:id', authMiddleware, roomController.getRoomByIdController) ;

router.post('/create', authMiddleware, roomController.createRoomController );



module.exports = router;