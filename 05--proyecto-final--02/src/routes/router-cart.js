import { Router } from 'express';
import { ControllerCarts } from '../controllers/controller-cart.js';
import { cartValidator } from '../middlewares/cart-validator.js';

const ctrlCarts = new ControllerCarts();
const router = Router();

router.get('/', ctrlCarts.getCartCtrl)
router.get('/:cid', ctrlCarts.getCartByIdCtrl)
router.post('/', ctrlCarts.createCartCtrl)
router.put('/:cid/:pid', ctrlCarts.addToCartCtrl)
router.put('/:id/', cartValidator, ctrlCarts.updateCartCtrl)
router.delete('/:cid/:pid', ctrlCarts.deleteProdFromCartCtrl)
router.delete('/:cid', ctrlCarts.deleteCartCtrl)
router.delete('/', ctrlCarts.deleteAllCartCtrl)

export default router