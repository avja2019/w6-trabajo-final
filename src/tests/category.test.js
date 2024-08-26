

const  BASE_URL = '/api/v1/categories'
const  BASE_URL_LOGIN = '/api/v1/users/login'

beforeAll(async()=> {
    const user = {
        email: "diana@gmail.com",
        password: "diana1234"
    }
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user)
    TOKEN = res.body.token 
    //console.log(TOKEN)  
})

const category = {
    name: "Shoes"
}

test("POST -> BASE_URL, should return statusCode 201, res.body.name === category.name", async () => {
    const res = await request(app)
      .post(BASE_URL)
      .send(category)
      .set(`Authorization`, `Bearer ${TOKEN}`)
  
    categoryId = res.body.id
  
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
  })