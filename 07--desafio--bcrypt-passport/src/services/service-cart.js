import { DaoMDBCart } from '../daos/mdb/dao-mdb-cart.js'
export const daoCart = new DaoMDBCart();

export class ServiceCarts {
    constructor() { }

    async getCartSvc() {
        try {
            const docs = await daoCart.getCarts();
            return docs
        } catch (err) { console.log(err) }
    }

    async getCartByIdSvc(id) {
        try {
            const doc = await daoCart.getCartById(id);
            if (!doc) throw new Error(`(!) Cart not found by the service.`)
            else return doc
        } catch (err) { console.log(err) }
    }

    async createCartSvc() {
        try {
            const newDoc = await daoCart.createCart()
            return newDoc
        } catch (err) { console.log(err) }
    }

    async addToCartSvc(cid, pid, qty) {
        try {
            const oldDoc = await daoCart.getCartById(cid)
            if (!oldDoc) {
                throw new Error(`(!) Cart not found by the service.`)
            } else {
                const newDoc = await daoCart.addToCart(cid, pid, qty);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async updateCartSvc(id, arr) {
        try {
            const oldDoc = await daoCart.getCartById(id);
            if (oldDoc) {
                const newDoc = await daoCart.updateCart(id, arr);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async deleteProdFromCartSvc(cid, pid) {
        try {
            const oldDoc = await daoCart.getCartById(cid)
            if (!oldDoc) {
                throw new Error(`(!) Cart not found by the service.`)
            } else {
                const newDoc = await daoCart.deleteProdFromCart(cid, pid);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async deleteAllProdFromCartSvc(id) {
        try {
            const oldDoc = await daoCart.getCartById(id);
            if (oldDoc) {
                const newDoc = await daoCart.deleteAllProdFromCart(id);
                return newDoc
            }
        } catch (err) { console.log(err) }
    }

    async deleteCartSvc(id) {
        try {
            const doc = await daoCart.deleteCart(id)
            return doc
        } catch (err) { console.log(err) }
    }

    async deleteAllCartSvc() {
        try {
            await daoCart.deleteAllCart()
        } catch (err) { console.log(err) }
    }
}