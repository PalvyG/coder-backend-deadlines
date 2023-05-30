import { Router } from 'express';
import { daoFsProduct } from "../daos/fs/dao-fs-prod.js";
import { productValidator } from '../middlewares/product-validator.js';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const products = await daoFsProduct.getProducts();
        if (limit >= 0) {
            const limitProducts = await products.slice(0, limit)
            res.status(200).json(limitProducts)
        } else {
            res.status(200).json(products)
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const product = await daoFsProduct.getProductById(Number(pid))
        product ? res.status(200).json({ message: '(i) Product found successfully!', product }) : res.status(404).json({ message: '(!) Product not found' })
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

router.post('/', productValidator, async (req, res) => {
    try {
        const product = req.body
        const productPost = await daoFsProduct.addProduct(product)
        res.status(200).json({ message: "(i) Product added successfully!", product: productPost })
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err)
    }
})

router.put('/:pid', productValidator, async (req, res) => {
    try {
        const { title, desc, price, stock, cat, status, code, thumb } = req.body;
        const product = { title, desc, price, stock, cat, status, code, thumb }
        const { pid } = req.params;
        const productFound = await daoFsProduct.getProductById(Number(pid))
        if (productFound) {
            await daoFsProduct.updateProduct(Number(pid), product)
            res.status(200).json({ message: `(i) "${productFound.title}" (ID: ${Number(pid)}) was successfully updated!`, update: product })
        } else {
            res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${Number(pid)}).` })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const productFound = await daoFsProduct.getProductById(Number(pid))
        if (productFound) {
            res.status(200).json({ message: `(i) "${productFound.title}" (ID: ${Number(pid)}) was deleted successfully.` })
            await daoFsProduct.deleteProduct(Number(pid))
        } else {
            res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${Number(pid)}).` })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err)
    }
})

router.delete('/', async (req, res) => {
    try {
        await daoFsProduct.deleteAllProducts();
        res.status(200).json({ message: "(i) All products deleted successfully" })
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err)
    }
})

export default router