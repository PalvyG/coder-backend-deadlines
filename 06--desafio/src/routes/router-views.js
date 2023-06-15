import { Router } from 'express'
const router = Router();

router.get('/index', async (req, res) => {
    res.render('index')
});

router.get('/products-realtime', async (req, res) => {
    res.render('products-realtime')
});

router.get('/register', async (req, res) => {
    res.render('register')
});

router.get('/login', async (req, res) => {
    res.render('login')
});

export default router;