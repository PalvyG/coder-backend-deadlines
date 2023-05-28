import { ProductManager } from "./manager/product-manager.js";
import express from 'express';

const productManager = new ProductManager;
const app = express();
const port = 8080;

const execution = async () => {
    await productManager.addProduct('Remera', 'Remerita bien facherita', 7500, 'urlgenerica', 50);
    await productManager.addProduct('Pantalon', 'Pantaloncito bien facherito', 12500, 'urlgenerica2', 70);
    await productManager.addProduct('Gorra Messi', 'Gorrita del Messias bien mundialista', 181222, 'urlgenerica3', 1);
    console.log(await productManager.getProducts())
}
execution()

app.get('/', (req, res) => {
    try {
        res.send('Server loaded correctly')
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

app.get('/home', (req, res) => {
    try {
        res.send('Homepage')
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query
        const products = await productManager.getProducts();
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

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await productManager.getProductById(Number(id))
        product ? res.status(200).json({message: 'Product found successfully', product}) : res.status(404).json({ message: 'Product not found' })
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})

app.listen(port, () => {
    try {
        console.log(`Express Server active in port ${port}`);
    } catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }
})