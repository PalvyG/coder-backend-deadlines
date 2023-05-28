class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumb, stock) {
        const product = {
            title,
            description,
            price,
            thumb,
            id: this.#generateId()+1,
            stock
        }
        this.products.push(product);
    }

    #generateId() {
        let newId = 0;
        this.products.map((product) => {
            if(product.id > newId) newId = product.id;
        });
        return newId;
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        if(this.products.find((product) =>product.id === id)) return this.products.find((product) =>product.id === id)
        else return `Error: Could not find product with specified ID (ID: ${id})`
    }
}

const productManager = new ProductManager
productManager.addProduct('Remera', 'Remerita bien facherita', 7500, 'urlgenerica', 50)
productManager.addProduct('Pantalon', 'Pantaloncito bien facherito', 12500, 'urlgenerica2', 70)
productManager.addProduct('Gorra Messi', 'Gorrita del Messias bien mundialista', 181222, 'urlgenerica3', 1)
console.log(productManager.getProducts())
console.log(productManager.getProductById(3))
console.log(productManager.getProductById(4))