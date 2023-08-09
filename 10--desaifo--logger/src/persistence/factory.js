import { DaoMDBProduct } from './daos/mdb/dao-mdb-prod.js'
import { DaoMDBMockProd } from './daos/mdb/zz-mocks/dao-mdb-mock_prod.js'
import { DaoMDBUser } from './daos/mdb/dao-mdb-user.js'
import { DaoMDBCart } from './daos/mdb/dao-mdb-cart.js'
import { DaoMDBTicket } from './daos/mdb/dao-mdb-ticket.js'
import { DaoFSProduct } from './daos/fs/dao-fs-prod.js'
import { DaoFSCart } from './daos/fs/dao-fs-cart.js'
import { initMDB } from './connection-mdb.js'
import 'dotenv/config'

let daoProd;
let daoCart;
let daoUser;
let daoTicket;
let daoMockProd;

const persistence = process.env.PERSISTENCE

switch (persistence) {
    case 'fs':
        daoProd = new DaoFSProduct()
        daoCart = new DaoFSCart()
        break;
    case 'mdb':
        await initMDB()
        daoProd = new DaoMDBProduct()
        daoMockProd = new DaoMDBMockProd()
        daoCart = new DaoMDBCart()
        daoUser = new DaoMDBUser()
        daoTicket = new DaoMDBTicket()
        break;
    default:
        await initMDB()
        daoProd = new DaoMDBProduct()
        daoMockProd = new DaoMDBMockProd()
        daoCart = new DaoMDBCart()
        daoUser = new DaoMDBUser()
        daoTicket = new DaoMDBTicket()
        break;
}

export default { daoProd, daoMockProd, daoCart, daoUser, daoTicket }