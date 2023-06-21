import {Router} from 'express'
import { ControllerUsers } from '../controllers/controller-user.js'
import { userValidator } from '../middlewares/user-validator.js'
import passport from 'passport'

const ctrlUser = new ControllerUsers();
const router = Router();

// router.post('/register', passport.authenticate('register'), ctrlUser.registerResponse)
// router.post('/login', passport.authenticate('login'), ctrlUser.loginResponse)

router.post('/register', userValidator, ctrlUser.createUserCtrl);
router.post('/login', ctrlUser.loginUserCtrl);

export default router;