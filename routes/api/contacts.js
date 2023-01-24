const express = require('express')

const { middleware } = require('../../middleware/middlewareValidate')
const { validSchemaPost, validSchemaPut } = require('../../utils/validSchema.js')

const router = express.Router()

const { listContacts,
  getContactById, 
  removeContact, 
  addContact, 
  updateContact
    } = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json(contacts)
  } catch (error) {
    console.log(error.message)
  }
})

router.get('/:contactId', async (req, res, next) => {
   const { contactId } = req.params;
  const contactById = await getContactById(contactId)

  if(!contactById ) {
    return res.status(404).json({
    message: `We didn't find  ${contactId}`
    })
  }
  res.status(200).json(contactById)
})

router.post('/', middleware(validSchemaPost, 'query'), async (req, res, next) => {
  const addedContact = await addContact(req.query)

  res.status(201).json(addedContact)

})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contactById = await getContactById(contactId)
  
  if (contactById === undefined) {
    res.status(404).json({
    message: `Contact with ID ${contactId} not found. Please try again`
  })
  } else {
    await removeContact(contactId)
    res.status(200).json({
    message: `Contact with ID ${contactId} deleted successfully`
  })
  }
})

router.put('/:contactId',middleware(validSchemaPut, 'query'), async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.query
  const contactforUpdate = await updateContact(contactId, body)

  if (!contactforUpdate) {
    res.status(404).json({"message": "Not found"})
  } else {
    res.status(200).json(contactforUpdate)
  }
})

module.exports = router
