import fs from 'fs';
const path = './products.json'

export class ProductManager {
    constructor() {
        this.newId = 1;
    }

    async addProduct(title, description, price, thumb, stock) {
        try {
            const productsFile = await this.getProducts();
            const product = {
                title,
                description,
                price,
                thumb,
                id: this.newId++,
                stock
            };
            const prodFind = productsFile.find(prod => prod.id === Number(product.id))
            !prodFind ? productsFile.push(product) : console.log(`This product is already inside the database (ID: ${prodFind.id})`)
            await fs.promises.writeFile(path, JSON.stringify(productsFile));
        } catch (err) { console.log(err) }
    }

    async getProducts() {
        try {
            if (fs.existsSync(path)) {
                const products = await fs.promises.readFile(path, 'utf-8')
                const productsJS = JSON.parse(products)
                return productsJS
            } else { return [] }
        } catch (err) { console.log(err) }
    }

    async getProductById(id) {
        try {
            const products = await fs.promises.readFile(path, 'utf-8')
            const productsJS = JSON.parse(products)
            if (productsJS.find((product) => product.id === id)) return productsJS.find((product) => product.id === id)
        } catch (err) { console.log(err) }
    }

    async updateProduct(id, prop, val) {
        try {
            const products = await fs.promises.readFile(path, 'utf-8')
            const productsJS = JSON.parse(products)
            if (productsJS.find((product) => product.id === id)) {
                const obj = productsJS.find((product) => product.id === id)
                if (!Object.hasOwn(obj, prop)){
                    console.log(`Error: Object does not contain the specified property (${prop})`)
                } else {
                    console.log(`(i) ${obj.title}'s property (${prop}) was successfully updated!`)
                    obj[prop] = val
                    console.log(`(i) New value: ${val}`)
                    await fs.promises.writeFile(path, JSON.stringify(productsJS))
                }
            } else return `Error: Could not find product with specified ID (ID: ${id})`
        } catch (err) { console.log(err) }
    }

    async removeProduct(id) {
        try {
            const products = await fs.promises.readFile(path, 'utf-8')
            const productsJS = JSON.parse(products)
            const foundIndex = productsJS.findIndex((product) => product.id == id)
            if (productsJS.find((product) => product.id === id)) {
                productsJS.splice(foundIndex, 1)
                await fs.promises.writeFile(path, JSON.stringify(productsJS));
            } else { console.log(`Error: Could not find product with specified ID (ID: ${id})`) }
            const productsFile = await this.getProducts();
            await fs.promises.writeFile(path, JSON.stringify(productsFile));
        } catch (err) { console.log(err) }
    }
}