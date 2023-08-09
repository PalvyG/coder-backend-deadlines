import { Schema, model } from 'mongoose'

const schemaMockProd = new Schema({
    title: { type: String, required: true },
    desc: { type: String, default: 'No description provided.' },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    cat: { type: String, default: 'other' },
    status: { type: Boolean, default: true },
    qty: { type: Number }
})

export const modelMockProd = model(
    'mock_products',
    schemaMockProd
);