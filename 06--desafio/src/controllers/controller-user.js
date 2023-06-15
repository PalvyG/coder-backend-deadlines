import { ServiceUsers } from "../services/service-user.js";
const svcUser = new ServiceUsers();

export class ControllerUsers {
    constructor() { }

    async createUserCtrl(req, res, next) {
        try {
            const newDoc = req.body
            const newDocPost = await svcUser.createUserSvc(newDoc)
            if (newDocPost) {
                res.redirect('/views/register-ok')
            } else {
                res.redirect('/views/register-err')
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
                req.session.firstname = user.firstname
                res.redirect('/views/login-ok')
            } else {
                res.redirect('/views/login-err')
            }
        } catch (err) { next(err) }
    }
}