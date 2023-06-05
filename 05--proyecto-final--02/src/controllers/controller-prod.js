import { ServiceProducts } from "../services/service-prod.js";
const svcProd = new ServiceProducts();

export class ControllerProducts {
    constructor() { }

    async getProdCtrl(req, res, next) {
        try {
            const { page, limit } = req.query
            const result = await svcProd.getProdSvc(page, limit);
            const nextPage = result.hasNextPage ? `http://localhost:8080/users?page=${result.nextPage}` : null
            const prevPage = result.hasPrevPage ? `http://localhost:8080/users?page=${result.prevPage}` : null
            res.json({
                results: result.docs,
                info: {
                    count: result.totalDocs,
                    pages: result.totalPages,
                    nextPage,
                    prevPage
                }
            });
        } catch (err) { next(err) }
    }

    async getProdByIdCtrl(req, res, next) {
        try {
            const { pid } = req.params
            const doc = await svcProd.getProdByIdSvc(pid)
            doc ? res.status(200).json({ message: '(i) Product found successfully!', product }) : res.status(404).json({ message: '(!) Product not found by the controller.' })
            res.json(doc)
        } catch (err) { next(err) }
    }

    async addProdCtrl(req, res, next) {
        try {
            const newDoc = req.body
            const newDocPost = await svcProd.addProdSvc(newDoc)
            res.status(200).json({ message: "(i) Product added successfully!", product: newDocPost })
        } catch (err) { next(err) }
    }

    async updateProdCtrl(req, res, next) {
        try {
            const { title, desc, price, stock, cat, status, thumb } = req.body;
            const newDoc = { title, desc, price, stock, cat, status, thumb }
            const { pid } = req.params;
            const oldDoc = await svcProd.getProdByIdSvc(pid)
            if (oldDoc) {
                await svcProd.updateProdSvc(pid, newDoc)
                res.status(200).json({ message: `(i) "${productFound.title}" (ID: ${pid}) was successfully updated!`, update: newDoc })
            } else {
                res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${pid}).` })
            }
        } catch (err) { next(err) }
    }

    async deleteProdCtrl(req, res, next) {
        try {
            const { pid } = req.params;
            const doc = await svcProd.getProdByIdSvc(pid)
            if (doc) {
                res.status(200).json({ message: `(i) "${doc.title}" was deleted successfully. (ID: ${pid})` })
                await svcProd.deleteProdSvc(pid)
            } else {
                res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${pid}).` })
            }
        } catch (err) { next(err) }
    }

    async deleteAllProdCtrl(req, res, next) {
        try {
            await svcProd.deleteAllProdSvc()
            res.status(200).json({ message: "(i) All products deleted successfully" })
        } catch (err) { next(err) }
    }
}
