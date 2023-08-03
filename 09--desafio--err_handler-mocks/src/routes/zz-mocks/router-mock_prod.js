import { Router } from 'express';
import { ControllerMockProd } from '../../controllers/zz-mocks/controller-mock_prod.js';
const ctrlMockProd = new ControllerMockProd();

const router = Router();

router.get('/', ctrlMockProd.getMockProdCtrl)
router.post('/', ctrlMockProd.addMockProdCtrl)
router.delete('/', ctrlMockProd.deleteMockProdsCtrl)

export default router