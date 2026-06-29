const express = require('express');
const router = express.Router();


const menuControllers = require('../controllers/menu.controller');

router.get('/',menuControllers.getAllMenu);
router.get('/search',menuControllers.searchMenu);
router.get('/category/:type',menuControllers.getByCategory);
router.get('/:id',menuControllers.getItemById);
router.post('/',menuControllers.createMenuItem);
router.put('/:id',menuControllers.updateMenuItem)
router.delete('/:id',menuControllers.deleteMenuItem);

module.exports = router;

