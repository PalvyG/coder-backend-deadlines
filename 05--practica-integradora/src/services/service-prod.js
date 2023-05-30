import { DaoMDBProduct } from '../daos/mdb/dao-mdb-prod.js'
const daoProd = new DaoMDBProduct();

export class ServiceProducts {
    constructor() {}
    
    async getProdSvc() {
        try {
            const docs = await daoProd.getProducts();
            return docs
        } catch (err) { console.log(err) }
    }

    async getProdByIdSvc(id) {
        try {
            const doc = await daoProd.getProductById(id);
            if (!doc) throw new Error(`(!) Product not found by the service.`)
            else return doc
        } catch (err) { console.log(err) }
    }

    async addProdSvc(prod) {
        try {
            const newDoc = await daoProd.addProduct(prod)
            if (!newDoc) throw new Error(`(!) Validation error by the service.`)
            else return newDoc
        } catch (err) { console.log(err) }
    }

    async updateProdSvc(id, prod) {
        try {
            const oldDoc = await daoProd.getProductById(id)
            if (!oldDoc) {
                throw new Error(`(!) Product not found by the service.`)
            } else {
                const newDoc = await daoProd.updateProduct(id, prod);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async deleteProdSvc(id) {
        try {
            const doc = await daoProd.deleteProduct(id)
            return doc
        } catch (err) { console.log(err) }
    }

    async deleteAllProdSvc() {
        try {
            await daoProd.deleteAllProducts()
        } catch (err) { console.log(err) }
    }
}
