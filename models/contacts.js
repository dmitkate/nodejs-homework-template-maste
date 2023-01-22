const fs = require('fs/promises'); 
const path = require('path');
const uniqid = require('uniqid');

const contactsPath = path.normalize("./models/contacts.json");

const contacts = path.normalize("./models/contacts.json");

const listContacts = async () => {
  try {
        const data = await fs.readFile(contacts, "utf8")
        return JSON.parse(data)
    } catch (error) {
        console.log('error', error)
    }
}

const getContactById = async (contactId) => {
  try {
        const contacts = await listContacts()
    const updateList = contacts.find((contact) => contact.id === contactId)
    await fs.writeFile(contacts, JSON.stringify(updateList, null, '\t'), "utf-8")
        return contacts
    } catch (error) {
        console.log('error', error)
    }
}

const removeContact = async (contactId) => {
   try {
        const contacts = await listContacts()
        return contacts.filter((contact) => contact.id !== contactId)
    } catch (error) {
        console.log('error', error)
    }
}

const addContact = async (body) => {
        try {
        const id = uniqid()
        const { name, email, phone } = body
        const addedContact = { id, name, email, phone }
        
        const contacts = await listContacts()        
        contacts.push(addedContact)
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'), "utf-8")
        return addedContact
    } catch (error) {
        console.log('error', error)
    }
}

const updateContact = async (contactId, body) => {
    try {
        const contacts = await listContacts()
        const contactFromId = contacts.find((obj) => obj.id === contactId)
        
        contactFromId.name = body.name || contactFromId.name
        contactFromId.email = body.email || contactFromId.email
        contactFromId.phone = body.phone || contactFromId.phone
        
        if (!contactFromId) {
            return null
        }

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'), "utf-8")
        return contactFromId
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
