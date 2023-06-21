import passport from 'passport';
import { Strategy as GithubStrat } from 'passport-github2';
import { DaoMDBUser } from '../daos/mdb/dao-mdb-user';
const userDao = new DaoMDBUser();

const stratOptions = {
    clientID: 'Iv1.d7b9ba5431fc137b',
    clientSecret: '1c34737182f9cfac329804056d9b55a147f46cb0',
    callbackURL: 'http://localhost:8080/users/profile-github'
}

const auth = 0