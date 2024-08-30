// const request = require("supertest")
// const app = require('../app')
// const Category = require("../models/Category")

// let TOKEN
// let category

// const  BASE_URL_LOGIN = '/api/v1/users/login'
// const BASE_URL = '/api/v1/products'
// //let product
// let productId

// beforeAll(async()=> {
//     const  hits = {
//         email: "diana@gmail.com",
//         password: "diana1234"
//     }
//     const res = await request(app)
//         .post(BASE_URL_LOGIN)
//         .send(hits)
//     TOKEN = res.body.token
//     //console.log(TOKEN)



// })

// const producto = {
//   title: 'Zapato niños',
//   description: 'para niños',
//   price: '40'
// }

// // beforeEach(() => {
// //   console.log('Me ejecute antes del test');
// // })


// test("POST -> 'BASE_URL', should return status code 201, and res.body.title === product.title", async () => {
//     category = await  Category.create({name:'ropa para niños'})
//     producto.categoryId = category.dataValues.id

//     const res = await request(app)
//       .post(BASE_URL)
//       .send(producto)
//       .set('Authorization', `Bearer ${TOKEN}`)

//     console.log(category);
//     console.log(res);
//    // console.log(producto)
//     productId = res.body.id

//     expect(res.status).toBe(201)
//     expect(res.body).toBeDefined()
//     expect(res.body.title).toBe(producto.title)
//     //expect(res.body.categoryId).toBe(category.dataValues.id)
//   })


 //------------------- version de prácticca -------------------


 require('../models')
const request = require("supertest")
const app = require('../app')
const Category = require("../models/Category")
const User = require('../models/User')
const Product = require('../models/Product')

let TOKEN
let category
let user
let cart
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/cart'

let product
let cartId

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
  category = await Category.create({ name: 'ropa para niño' })
  user = await User.create({firstName: "ruth",lastName: "Alanya",email: "ruth@gmail.com",password: "ruth1234",phone: "+51918156701"})
  product = await Product.create({title: 'gorra blue niña',description: 'lorem 10',price: '12.30',categoryId: category.id})
  cart = {
    productId: product.id,
    quantity: 30,
  }
})

// beforeEach(() => {
//   console.log('Me ejecute antes del test');
//  })

afterAll((async () => {
  await category.destroy()
  await user.destroy()
  await product.destroy()
}))


//!  TESTS

test("POST -> 'BASE_URL', should return status code 201, and res.body.title === product.title", async () => {

  // console.log(TOKEN);

  const res = await request(app)
    .post(BASE_URL)
    .send(cart)
    .set('Authorization', `Bearer ${TOKEN}`)

   console.log(res.body);
  cartId = res.body.id

  //expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(cart.quantity)
  expect(res.body.cartId).toBe(cart.id)
})

test("GET -> 'BASE_URL', should return status code 200, and res.body.length = 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

   //console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  //1:n
  expect(res.body[0].product.id).toBeDefined()
  expect(res.body[0].product.id).toBe(product.id)

})

test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.title === product.title", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
  // console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()

  //1:n
  expect(res.body.product.id).toBeDefined()
  expect(res.body.product.id).toBe(product.id)
})

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.title === updateProduct.title", async () => {

  const updateProduct = {
    quantity: 10
  }
  const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(updateProduct)
    .set('Authorization', `Bearer ${TOKEN}`)

  // console.log(res.body);s

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(updateProduct.quantity)

  //1:n
  expect(res.body.productId).toBeDefined()
  expect(res.body.productId).toBe(product.id)
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  // console.log(res.body);

  expect(res.status).toBe(204)
})