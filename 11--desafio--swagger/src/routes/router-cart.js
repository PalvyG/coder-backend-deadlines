import { Router } from 'express';
import { ControllerCarts } from '../controllers/controller-cart.js';
import { ControllerTicket } from '../controllers/controller-ticket.js';
import { cartBodyValidation, cartUserValidation } from '../middlewares/cart-validator.js';
import { isAdmin } from '../middlewares/is-admin.js'

const ctrlCarts = new ControllerCarts();
const ctrlTicket = new ControllerTicket();
const router = Router();

router.get('/', isAdmin, ctrlCarts.getCartCtrl) // OK
router.get('/tickets', isAdmin, ctrlTicket.getAllTicketsCtrl)
router.get('/:cid', cartUserValidation, ctrlCarts.getCartByIdCtrl) // OK
router.get('/:cid/tickets', cartUserValidation, ctrlTicket.getUserTicketCtrl)
router.put('/:cid/prod/:pid', cartUserValidation, ctrlCarts.addToCartCtrl) // OK
router.put('/:cid/', cartUserValidation, cartBodyValidation, ctrlCarts.updateCartCtrl) // OK
router.delete('/:cid/prod/:pid', cartUserValidation, ctrlCarts.deleteProdFromCartCtrl) // OK
router.delete('/:cid/allprod', cartUserValidation, ctrlCarts.deleteAllProdFromCartCtrl) // OK
router.post('/:cid/checkout', cartUserValidation, ctrlTicket.createTicketCtrl) // OK

export default router