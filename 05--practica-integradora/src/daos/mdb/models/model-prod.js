import { Schema, model } from 'mongoose'
const schemaProd = new Schema({
    title: {type: String, required: true},
    desc: {type: String, default: 'No description provided.'},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    cat: {type: String, default: 'other'},
    status: {type: Boolean, default: true},
})

export const modelProd = model(
    'products',
    schemaProd
);