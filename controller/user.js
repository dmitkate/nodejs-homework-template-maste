const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../models/useSchema');
const { hashedPassword, checkPassword } = require('../utils/passwordHash');
const { ConflictError, AuthError } = require('../utils/errorList');
const gravatar = require('gravatar');
const { JWT_SECRET } = process.env;
const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp')

const addUser = async (req, res, next) => {
    const { email, password } = req.query
    const conflictUser = await User.findOne({ email })
    const createdAvatar = gravatar.url(email, {protocol: 'https', s: '400', r: 'g', d: 'identicon', f: 'y'})
    
    if (conflictUser) {
        return (next(ConflictError(409, 'Email in use, please change it and try again')))
    }

    const user = await User.create({
        email, password: await hashedPassword(password), avatarURL: createdAvatar
    })
    
    return res.status(201).json({
        newUser: { email: user.email, subscription: user.subscription, avatar: user.avatarURL }
    })
}


const loginUser = async (req, res, next) => {
    const { email, password } = req.query   
    
    const user = await User.findOne({ email })
    if (!user) {
        return next(AuthError(401, 'Email is wrong, please try again'))
    }

    const validPassw = await checkPassword(password, user.password)
    if (!validPassw) {
        return next(AuthError(401, 'Password is wrong, please try again'))
    }

    const payload = { id: user._id, email: user.email }
    const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "5d", 
    })

    await User.findByIdAndUpdate(user._id, { token }, { new: true })
    
    return res.status(201).json({
        token: token,
        user: {
            email: user.email,
            subscription: user.subscription,
            avatar: user.avatarURL
        }        
    })

}

const logoutUser = async (req, res, next) => {
    if (!req.user) {
        return next(AuthError(401, "Missing User in body!"))
    }

    const token = null
    await User.findByIdAndUpdate(req.user.id, { token }, { new: true })

    return res.status(204).json({
        message: 'No Content',
    })
}

const currentUser = async (req, res, next) => {
    if (!req.user) {
        return next(AuthError(401, "Missing User in body!"))
    }

    const user = await User.findById(req.user.id)    
    if (!user) {
        return next(AuthError(401, "Not authorized"))
    }

    return res.status(200).json({
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatarURL
    }) 
}


const folder = path.join(__dirname, "../", "public", "avatars")
const addAvatar = async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        return next(AuthError(401, "Not authorized"))
    }
    
    const { path: temporaryName, originalname } = req.file
    
    const fileName = path.join(req.user.id + "-" + originalname)
    const avatarURL = path.join("public", "avatars", fileName)

    await Jimp.read(temporaryName)
        .then(avatar => {
        return avatar
            .resize(250, 250)
            .write(temporaryName);
        }).catch(err => {
            return next(err)
        })

    try {
        await fs.rename(temporaryName, path.join(folder, fileName))
        await User.findByIdAndUpdate(req.user.id, { avatarURL })

        res.status(200).json({
            email: user.email,
            avatarURL: user.avatarURL
        })
    } catch (err) {
        await fs.unlink(temporaryName)
        return next(err)
    }    
}


module.exports = {
    addUser, 
    loginUser,
    logoutUser,
    currentUser,
    addAvatar
}