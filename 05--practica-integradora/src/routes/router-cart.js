import { Router } from 'express';
import { DaoFSCart } from '../daos/fs/dao-fs-cart.js';
const router = Router();
const daoFsCart = new DaoFSCart;

router.get('/', async (req, res) => {
    try {
        const carts = await daoFsCart.getCarts()
        res.status(200).json(carts)
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cartFound = await daoFsCart.getCartById(Number(cid))
        if (cartFound) {
            res.status(200).json({ message: `(i) Cart with specified ID (${cid}) found successfully!`, cart: cartFound })
        } else {
            res.status(404).json({ message: `(!) Could not find cart with specified ID (ID: ${Number(cid)}).` })
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    try {
        await daoFsCart.createCart();
        res.status(200).json({ message: '(i) Cart created successfully!' })
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.put('/:cid/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = await daoFsCart.addToCart(Number(cid), Number(pid))
        const updatedCart = await daoFsCart.getCartById(Number(cid))
        if (result === 'cart_404'){
            res.status(404).json({message: `(!) Could not find cart with specified ID (ID: ${cid})`})
        } else if (result === 'prod_404') {
            res.status(404).json({message: `(!) Could not find product with specified ID (ID: ${pid})`})
        } else {
            res.status(200).json({ message: `(i) Product with specified ID (${pid}) added to cart with specified ID (${cid}) successfully!`, cart: updatedCart })
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cartFound = await daoFsCart.getCartById(Number(cid))
        if (cartFound) {
            res.status(200).json({ message: `(i) Cart deleted successfully (ID: ${Number(cid)}). ` })
            await daoFsCart.removeCart(Number(cid))
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.delete('/', async (req, res) => {
    try {
        await daoFsCart.removeAllCarts();
        res.status(200).json({ message: "(i) All carts deleted successfully." })
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

export default router