import { Schema, model } from 'mongoose'
const schemaCart = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products',
        default: []
    }]
})

schemaCart.pre('find', function () {
    this.populate('products', ['_id', 'qty'])
})

export const modelCart = model(
    'carts',
    schemaCart
);