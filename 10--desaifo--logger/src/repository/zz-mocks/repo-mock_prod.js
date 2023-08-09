import factory from '../../persistence/factory.js';
const { daoMockProd } = factory

export class RepoMockProd {
    constructor() { }

    async addMockProdSvc(times) {
        try {
            const newDocs = await daoMockProd.addMockProds(times);
            return newDocs
        } catch (err) { console.log(err) }
    }

    async getMockProdsSvc() {
        try {
            const docs = await daoMockProd.getMockProds();
            return docs
        } catch (err) { console.log(err) }
    }

    async deleteMockProdsSvc() {
        try {
            await daoMockProd.deleteMockProds()
        } catch (err) { console.log(err) }
    }
}
