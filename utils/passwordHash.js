const bcrypt = require("bcrypt");

async function hashedPassword(password) {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}

async function checkPassword(password, hashed) {    
    return await bcrypt.compareSync(password, hashed);
}

module.exports = {
    hashedPassword,
    checkPassword
};