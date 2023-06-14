import { userModel } from './models/model-user.js';

export class DaoMDBUser {
    constructor() { }
    async createUser(user) {
        try {
            const findUser = await userModel.findOne({ email: user.email })
            if (!findUser) {
                if (user.email.includes('.admin') && user.password.includes('.admin')) {
                    const newAdmin = await userModel.create({ ...user, role: 'admin' })
                    return newAdmin
                } else {
                    const newUser = await userModel.create(user);
                    return newUser
                }
            }
        } catch (err) { console.log(err) }
    }

    async loginUser(user) {
        try {
            const findUser = await userModel.findOne({ email: user.email })
            if (findUser) { 
                if (user.password === findUser.password) { return findUser } else { return false }
            } else { return null }
        } catch (err) { console.log(err) }
    }
}