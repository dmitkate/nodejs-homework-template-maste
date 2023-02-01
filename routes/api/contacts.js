const express = require('express')
const { tryCatch} = require('../../utils/tryCatch')
const { middleware } = require('../../middleware/middlewareValidate')
const { validSchemaPost, validSchemaPut, validSchemaPatch } = require('../../utils/validSchema.js')

const router = express.Router()

const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  addStatus
} = require('../../controller/contacts');

module.exports = router


router.get('/', tryCatch(listContacts))
    .get('/:contactId', tryCatch(getContactById))
    .delete('/:contactId', tryCatch(removeContact))
    .post('/', middleware(validSchemaPost, 'query'), tryCatch(addContact))
    .put('/:contactId', middleware(validSchemaPut, 'query'), tryCatch(updateContact))
    .patch('/:contactId/favorite', middleware(validSchemaPatch, 'query'),  tryCatch(addStatus))
