import { Router } from 'express';
import { ControllerMockProd } from '../../controllers/zz-mocks/controller-mock_prod';
const ctrlMockProd = new ControllerMockProd();

const router = Router();

router.get('/', ctrlMockProd.getMockProdCtrl)
router.post('/', ctrlMockProd.addMockProdCtrl)

export default router