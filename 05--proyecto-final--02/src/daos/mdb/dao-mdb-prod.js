import { modelProd } from "./models/model-prod.js";

export class DaoMDBProduct {
    constructor() { };

    async addProduct(prod) {
        try {
            const response = await modelProd.create(prod)
            return response;
        } catch (err) { console.log(err) }
    }

    async getProducts(page = 1, limit = 5) {
        try {
            const response = await modelProd.paginate({}, { page, limit })
            return response
        } catch (err) { console.log(err) }
    }

    async getProductById(id) {
        try {
            const response = await modelProd.findById(id)
            return response
        } catch (err) { console.log(err) }
    }

    async updateProduct(id, prod) {
        try {
            await modelProd.updateOne({ _id: id }, prod)
            return prod
        } catch (err) { console.log(err) }
    }

    async deleteProduct(id) {
        try {
            const response = await modelProd.findByIdAndDelete({ _id: id })
            return response
        } catch (err) { console.log(err) }
    }

    async deleteAllProducts() {
        try {
            await modelProd.deleteMany({})
        } catch (err) { console.log(err) }
    }
}