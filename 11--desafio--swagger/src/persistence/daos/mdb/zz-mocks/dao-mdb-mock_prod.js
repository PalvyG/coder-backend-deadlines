import { modelMockProd } from "../models/zz-mocks/model-mock_prod.js";
import { faker } from '@faker-js/faker'
import { winlog } from "../../../../loggers/loggers.js";

export class DaoMDBMockProd {
    constructor() { }

    async addMockProds(times) {
        try {
            const mockProdArr = []
            for (let i = 0; i < times; i++) {
                const mockProd = {
                    title: faker.commerce.productName(),
                    desc: faker.commerce.productDescription(),
                    price: faker.commerce.price({ min: 1000, max: 10000 }),
                    stock: faker.commerce.price({ min: 10, max: 100 }),
                    status: true
                }
                mockProdArr.push(mockProd)
            }
            const result = await modelMockProd.create(mockProdArr)
            return result
        } catch (err) { winlog.debug(err) }
    }

    async getMockProds() {
        try {
            const result = await modelMockProd.find({})
            return result
        } catch (err) { winlog.debug(err) }
    }

    async deleteMockProds() {
        try {
            await modelMockProd.deleteMany({})
        } catch (err) { winlog.debug(err) }
    }
}