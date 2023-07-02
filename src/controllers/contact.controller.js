const Contact = require('../models/contact.model');

const createContact = async (contactBody) => {
    console.log(contactBody);
    return await Contact.create(contactBody);
}

const getContacts = async () => {
    console.log("allContacts");
    let allContacts = await Contact.find();   
    return allContacts;
}

module.exports = {
    createContact,
    getContacts
}