const User = require("../../models/User")

const userCreate = async () => {
    
    const user = {
        firstName: "Diana",
        lastName: "Alanya",
        email: "diana@gmail.com",
        password: "diana1234",
        phone: "+51918156738"
    }

    await User.create()
}

module.exports = userCreate