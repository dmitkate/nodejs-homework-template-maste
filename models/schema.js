const mongoose = require('mongoose') ;

const contactsSchema = mongoose.Schema  ({
    name: {
        type: String,
        minLength: [1, "oops, it's too short! try again please"],
        maxLength: [40, "oops, it's too long! try again please"],
    },
    email: {
        type: String,
        minLength: [5, "oops, it's too short! try again please"],
        unique: true,
    },
    phone: {
        type: String,
        minLength: [2, "oops, it's too short! try again please"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
})

const Contacts = mongoose.model('contacts', contactsSchema)
  
module.exports = {
  Contacts
}