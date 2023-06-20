import {Router} from 'express'
import { ControllerUsers } from '../controllers/controller-user.js'
import { userValidator } from '../middlewares/user-validator.js'

const ctrlUser = new ControllerUsers();
const router = Router();

router.post('/register', userValidator, ctrlUser.createUserCtrl);
router.post('/login', ctrlUser.loginUserCtrl);

export default router;