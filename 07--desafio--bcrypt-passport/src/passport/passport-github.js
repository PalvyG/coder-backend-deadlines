import passport from 'passport';
import { Strategy as GithubStrat } from 'passport-github2';
import { DaoMDBUser } from '../daos/mdb/dao-mdb-user.js';
const userDao = new DaoMDBUser();

const stratOptions = {
    clientID: 'Iv1.d7b9ba5431fc137b',
    clientSecret: '1c34737182f9cfac329804056d9b55a147f46cb0',
    callbackURL: 'http://localhost:8080/u/github-ok'
}

const auth = async (accessToken, refreshToken, profile, done) => {
    try {
        const userEmail = profile._json.email ? profile._json.email : profile._json.blog
        const findUser = await userDao.getUserByEmail(userEmail)
        if (!findUser) {
            let nameSplit = profile._json.name.split(' ')
            const firstnameSplit = () => {
                if (nameSplit.length >= 4) {
                    let result = nameSplit[(nameSplit.length - 4)] + ' ' + nameSplit[(nameSplit.length - 3)]
                    return result
                } else if (nameSplit.length = 3) {
                    let result = nameSplit[(nameSplit.length - 3)]
                    return result
                } else {
                    let result = nameSplit[(nameSplit.length - 2)]
                    return result
                }
            }
            const lastnameSplit = () => {
                if (nameSplit.length >= 3) {
                    let result = nameSplit[(nameSplit.length - 2)] + ' ' + nameSplit[(nameSplit.length - 1)]
                    return result
                } else {
                    let result = nameSplit[(nameSplit.length - 1)]
                    return result
                }
            }
            const newUser = {
                firstname: firstnameSplit(),
                lastname: lastnameSplit(),
                age: 18,
                email: userEmail,
                password: '',
                access: 'github'
            }
            const result = await userDao.createUser(newUser)
            return done(null, result)
        } else return done(null, findUser)
    } catch (err) { console.log(err) }
}

const githubAuthStrat = new GithubStrat(stratOptions, auth)

passport.use('github', githubAuthStrat)