import { ServiceCarts } from "../services/service-cart.js";
const svcCart = new ServiceCarts();

export class ControllerCarts {
    constructor() { }

    async getCartCtrl(req, res, next) {
        try {
            const { limit } = req.query
            const docs = await svcCart.getCartSvc();
            if (limit >= 0) {
                const limitDocs = docs.slice(0, limit)
                res.status(200).json(limitDocs)
            } else {
                res.status(200).json(docs)
            }
        } catch (err) { next(err) }
    }

    async getCartByIdCtrl(req, res, next) {
        try {
            const { cid } = req.params
            const doc = await svcCart.getCartByIdSvc(cid)
            doc ? res.status(200).json({ message: '(i) Cart found successfully!', product }) : res.status(404).json({ message: '(!) Cart not found by the controller.' })
            res.json(doc)
        } catch (err) { next(err) }
    }

    async createCartCtrl(req, res, next) {
        try {
            const newDoc = await svcCart.createCartSvc()
            res.status(200).json({ message: "(i) Cart created successfully!", cart: newDoc })
        } catch (err) { next(err) }
    }

    async addToCartCtrl(req, res, next) {
        try {
            const { cid, pid } = req.params
            const cart = await svcCart.getCartByIdSvc(cid)
            if (cart) {
                if (pid) {
                    await svcCart.addToCartSvc(cid, pid)
                    res.status(200).json({ message: `(i) Product was successfully added to cart! (ID: ${pid})`, update: cart })
                } else {
                    res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${pid}).` })
                }
            } else {
                res.status(404).json({ message: `(!) Could not find cart with specified ID (ID: ${cid}).` })
            }
        } catch (err) { next(err) }
    }

    async deleteCartCtrl(req, res, next) {
        try {
            const { cid } = req.params;
            const doc = await svcCart.getCartByIdSvc(cid)
            if (doc) {
                res.status(200).json({ message: `(i) Cart was deleted successfully. (ID: ${cid})` })
                await svcCart.deleteCartSvc(cid)
            } else {
                res.status(404).json({ message: `(!) Could not find cart with specified ID (ID: ${cid}).` })
            }
        } catch (err) { next(err) }
    }

    async deleteAllCartCtrl(req, res, next) {
        try {
            await svcCart.deleteAllCartSvc()
            res.status(200).json({ message: "(i) All carts deleted successfully" })
        } catch (err) { next(err) }
    }
}