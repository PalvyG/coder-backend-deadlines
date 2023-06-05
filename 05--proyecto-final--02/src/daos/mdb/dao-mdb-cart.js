import { modelCart } from './models/model-cart.js'
import { modelProd } from './models/model-prod.js'

const pathCarts = './carts.json'
const pathProducts = './products.json'

export class DaoMDBCart {
    constructor() { };
    async createCart() {
        try {
            const response = await modelCart.create({});
            return response
        } catch (err) { console.log(err) }
    }

    async getCarts() {
        try {
            const response = await modelCart.find({});
            return response
        } catch (err) { console.log(err) }
    }

    async getCartById(id) {
        try {
            const response = await modelCart.findById({ _id: id });
            return response
        } catch (err) { console.log(err) }
    }

    async addToCart(cid, pid) {
        try {
            const cartUpd = await modelCart.findById({ _id: cid });
            cartUpd.products.push(pid);
            cartUpd.save();
            return cartUpd;
        } catch (err) { console.log(err) }
    }

    async deleteCart(id) {
        try {
            const response = await modelCart.findByIdAndDelete({ _id: id });
            return response
        } catch (err) { console.log(err) }
    }

    async deleteAllCart() {
        try {
            const response = await modelCart.deleteMany({});
            return response
        } catch (err) { console.log(err) }
    }
}