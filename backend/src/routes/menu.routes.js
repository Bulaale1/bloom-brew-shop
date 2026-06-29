const express = require('express');
const router = express.Router();
const menuControllers = require('../controllers/menu.controller');
const { requireAdmin } = require('../middlewares/auth.middleware');

router.get('/', menuControllers.getAllMenu);
router.get('/search', menuControllers.searchMenu);
router.get('/category/:type', menuControllers.getByCategory);
router.get('/:id', menuControllers.getItemById);
router.post('/', requireAdmin, menuControllers.createMenuItem);
router.put('/:id', requireAdmin, menuControllers.updateMenuItem);
router.delete('/:id', requireAdmin, menuControllers.deleteMenuItem);

module.exports = router;

