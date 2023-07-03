require("dotenv").config();
const Contact = require("../models/contact.model");

class ContactService{
    async getContacts(){
        try {
            const contacts = await Contact.find();
            return contacts;
        } catch (err) {
            console.error(err);
            throw new Error("Error al obtener los contactos");
        }
    }

    async getContactById(id){
        try {
            const contact = await Contact.findById(id);
            return contact;
        } catch (err) {
            console.error(err);
            throw new Error("Error al obtener el contacto");
        }
    }

    async createContact(contact){
        try {
            let newContact = new Contact(contact);
            await newContact.save();
            return newContact;
        } catch (err) {
            console.error(err);
            throw new Error("Error al crear el contacto");
        }
    }

    async deleteContact(id){
        try {
            const contact = await Contact.findByIdAndDelete(id);
            return contact;
        } catch (err) {
            console.error(err);
            throw new Error("Error al eliminar el contacto");
        }
    }

    async updateContact(id, updateContact){
        try {
            const contactIsRegistered = await Contact.findById(id);
            if(!contactIsRegistered){
                throw new Error("El contacto no existe");
            }
            const contact = await Contact.findByIdAndUpdate(id, updateContact, {new: true});
            return contact;
        }
        catch (err) {
            console.error(err);
            throw new Error("Error al actualizar el contacto");
        }
    }
}

module.exports = new ContactService();