import { Schema, model } from 'mongoose'
const schemaCart = new Schema({
    products: {type: Array, required: true, default: []}
})

export const modelCart = model(
    'carts',
    schemaCart
);