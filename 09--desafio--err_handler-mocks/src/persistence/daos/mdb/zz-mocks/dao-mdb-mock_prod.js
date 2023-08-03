import { modelMockProd } from "../models/zz-mocks/model-mock_prod";
import { faker } from '@faker-js/faker'

export class DaoMDBMockProd {
    constructor() { }

    async addMockProds(num) {
        try {
            const mockProdArr = []
            for (let i = 0; i < num || 25; i++) {
                const mockProd = {
                    title: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: faker.commerce.price({ min: 1000, max: 10000 }),
                    stock: faker.commerce.price({ min: 10, max: 100 }),
                    status: true
                }
                mockProdArr.push(mockProd)
            }
            const result = await modelMockProd.insertMany(mockProdArr)
            return result
        } catch (err) { console.log(err) }
    }

    async getMockProds() {
        try {
            const result = await modelMockProd.find({})
            return result
        } catch (err) { console.log(err) }
    }
}