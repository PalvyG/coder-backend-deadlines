import factory from '../../persistence/factory.js';
const { daoMockProd } = factory

export class RepoMockProd {
    constructor() { }

    async addMockProdSvc(num) {
        try {
            const newDocs = await daoMockProd.addMockProds(num);
            return newDocs
        } catch (err) { console.log(err) }
    }

    async getMockProdsSvc() {
        try {
            const docs = await daoMockProd.getMockProds();
            return docs
        } catch (err) { console.log(err) }
    }
}
