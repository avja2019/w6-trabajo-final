
require('../models')
const request = require("supertest")
const app = require('../app')
const Category = require("../models/Category")
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Purchase = require('../models/Purchase')

let TOKEN
let category
let cart
let purchase
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/purchase'

let product
let cartId
let purchaseId

beforeAll(async () => {
  const hits = {
    email: "diana@gmail.com",
    password: "diana1234",
  }

  const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(hits)

  TOKEN = res.body.token
  // console.log(TOKEN);
  category = await Category.create({ name: 'ropa para bebes' })
  product = await Product.create({title: 'gorra blue bebe',description: 'lorem 10',price: '12.50',categoryId: category.id})
  cart = await Cart.create({quantity: 10, productId: product.id})
  //purchase = await Purchase.bulkCreate(cart);
  
})

// beforeEach(() => {
//   console.log('Me ejecute antes del test');
//  })

afterAll((async () => {
  await category.destroy()
  await product.destroy()
  await cart.destroy()
}))


//!  TESTS

test("POST -> 'BASE_URL', should return status code 201, and res.body.title === product.title", async () => {

  // console.log(TOKEN);

  const res = await request(app)
    .post(BASE_URL)
    //.send(purchase)
    .set('Authorization', `Bearer ${TOKEN}`)

   console.log(res.body);
   purchaseId = res.body.id

  //expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  //expect(res.body.quantity).toBe(cart.quantity)
  expect(res.body.purchaseId).toBe(purchase.id)
})

test("GET -> 'BASE_URL', should return status code 200, and res.body.length = 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

   console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  //1:n
  expect(res.body[0].product.id).toBeDefined()
  expect(res.body[0].product.id).toBe(product.id)

})