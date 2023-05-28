const fs = require('fs')
const path = './products.json'

class ProductManager {
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
            productsFile.push(product)
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
            else return `Error: Could not find product with specified ID (ID: ${id})`
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

const productManager = new ProductManager

const execution = async () => {
    const get1 = await productManager.getProducts();
    console.log('1st Get: ', get1);
    await productManager.addProduct('Remera', 'Remerita bien facherita', 7500, 'urlgenerica', 50);
    await productManager.addProduct('Pantalon', 'Pantaloncito bien facherito', 12500, 'urlgenerica2', 70);
    await productManager.addProduct('Gorra Messi', 'Gorrita del Messias bien mundialista', 181222, 'urlgenerica3', 1);
    const get2 = await productManager.getProducts();
    console.log('2nd Get: ', get2);
    const getId1 = await productManager.getProductById(3)
    console.log(getId1);
    const getId2 = await productManager.getProductById('1234')
    console.log(getId2);
    await productManager.removeProduct(2);
    const get3 = await productManager.getProducts();
    console.log('3rd Get: ', get3);
    await productManager.updateProduct(3, 'title', 'Pantalones')
    const get4 = await productManager.getProducts();
    console.log('4th Get: ', get4);
    await productManager.updateProduct(3, 'pepe', ':D')
}

execution()
