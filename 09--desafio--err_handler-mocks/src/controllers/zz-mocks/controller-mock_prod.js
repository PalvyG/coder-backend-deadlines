import RepoMockProd from '../../repository/zz-mocks/repo-mock_prod.js'
const repoMockProd = new RepoMockProd();

export class ControllerMockProd {
    constructor() { }

    async addMockProdCtrl(req, res, next) {
        try {
            const { num } = req.params
            let newDocsPost;
            switch (num) {
                case !num:
                    newDocsPost = await repoMockProd.addMockProdSvc(5)
                    res.status(200).json({ message: "(i) Mock products created successfully!", mocks: newDocsPost })
                    break;
                case num > 50:
                    newDocsPost = await repoMockProd.addMockProdSvc(50)
                    res.status(200).json({
                        alert: "(!) Woah there, that's too many products!",
                        message: "(i) 50 Mock products created successfully!",
                        mocks: newDocsPost
                    })
                    break;
                case 1 <= num <= 50:
                    newDocsPost = await repoMockProd.addMockProdSvc(num)
                    res.status(200).json({ message: "(i) Mock products created successfully!", mocks: newDocsPost })
                    break;
            }
        } catch (err) { next(err) }
    }

    async getMockProdCtrl(req, res, next) {
        try {
            const docs = await repoMockProd.getMockProdsSvc()
            res.status(200).json({ message: "(i) Mock products retrieved successfully!", mocks: docs })
        } catch (err) { next(err) }
    }
}
