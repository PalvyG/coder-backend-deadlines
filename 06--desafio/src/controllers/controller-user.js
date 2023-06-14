import { ServiceUsers } from "../services/service-user.js";
const svcUser = new ServiceUsers();

export class ControllerUsers {
    constructor() { }

    async createUserCtrl(req, res, next) {
        try {
            const newDoc = req.body
            const newDocPost = await svcUser.createUserSvcUser(newDoc)
            if (newDocPost) {
                res.status(200).json({ message: '(i) User created successfully!' })
            } else {
                res.status(400).json({ message: '(!) Something went wrong.' })
            }
        } catch (err) { next(err) }
    }

    async loginUserCtrl(req, res, next) {
        try {
            const credentials = req.body
            const user = await svcUser.loginUserSvc(credentials)
            if (user) {
                req.session.email = credentials.email
                req.session.password = credentials.password
                res.status(200).json({ message: '(i) User log-in successful!' })
            } else {
                res.status(400).json({ message: '(!) Invalid e-mail or password.' })
            }
        } catch (err) { next(err) }
    }
}