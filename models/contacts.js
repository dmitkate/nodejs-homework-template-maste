
const { Contacts } = require('../models/schema');




const listContacts = async (req, res, next) => {
  const contacts = await Contacts.find({})
  res.json(contacts)    
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contacts.findById(contactId)

  return res.json(contact);
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  await Contacts.findByIdAndRemove(contactId)

  return res.json({message: `Contact deleted`});
}

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.query
  const contact = await Contacts.create({ name, email, phone, favorite })

  return res.status(201).json(contact);
}


const updateContact = async (req, res, next) => {
     const { contactId } = req.params
  const contact = await Contacts.findByIdAndUpdate(contactId, req.query, { new: true })

  return res.status(201).json(contact);
}
const addStatus = async (req, res, next) => {
  const { contactId } = req.params

  const contact = await Contacts.findByIdAndUpdate(contactId, {favorite: req.query.favorite}, { new: true})
  return res.status(200).json(contact)
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  addStatus
}
