import factory from '../../persistence/factory.js';
import { winlog } from '../../loggers/loggers.js';
const { daoMockProd } = factory

export class RepoMockProd {
    constructor() { }

    async addMockProdSvc(times) {
        try {
            const newDocs = await daoMockProd.addMockProds(times);
            return newDocs
        } catch (err) { winlog.debug(err) }
    }

    async getMockProdsSvc() {
        try {
            const docs = await daoMockProd.getMockProds();
            return docs
        } catch (err) { winlog.debug(err) }
    }

    async deleteMockProdsSvc() {
        try {
            await daoMockProd.deleteMockProds()
        } catch (err) { winlog.debug(err) }
    }
}
