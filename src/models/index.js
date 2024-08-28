const User = require("./User")
const Category = require("./Category")
const Product = require("./Product")
const Cart = require("./Cart")
const Purchase = require("./Purchase")

//categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//userId
Cart.belongsTo(User)
User.hasMany(Cart)

//productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//UserId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)
