require('dotenv').config();
const ContactService = require('../services/contact.service');

class ContactController {
    async getContacts(req, res) {
        try {
            const contacts = await ContactService.getContacts();
            return res.status(200).json(contacts);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getContacts",
                message: err.message,
            });
        }
    }

    async getContactById(req, res) {
        try {
            let contact = await ContactService.getContactById(req.params.id);
            if (!contact) {
                return res.status(404).json({
                    method: "getContactById",
                    message: "Contacto no encontrado",
                });
            }
            return res.status(200).json(contact);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getContactById",
                message: err.message,
            });
        }
    }

    async createContact(req, res) {
        try {
            const {name, email, phone, message} = req.body;
            let newContact = await ContactService.createContact({name, email, phone, message});
            return res.status(200).json({
                message: "Contacto creado!",
                contact: newContact,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                method: "createContact",
                message: err.message});
            }
        }
    
    async deleteContact(req, res) {
        try {
            console.log(req.params.id)
            let contact = await ContactService.getContactById(req.params.id);
            if (!contact) {
                return res.status(404).json({
                    method: "deleteContact",
                    message: "Contacto no encontrado",
                });
            }
            let deletedContact = await ContactService.deleteContact(req.params.id);
            return res.status(200).json(deletedContact);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "deleteContact",
                message: err.message,
            });
        }
    }

    async updateContact(req, res) {
        try {
            let contact = await ContactService.getContactById(req.params.id);
            if (!contact) {
                return res.status(404).json({
                    method: "updateContact",
                    message: "Contacto no encontrado",
                });
            }
            let updatedContact = await ContactService.updateContact(req.params.id, req.body);
            return res.status(200).json(updatedContact);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "updateContact",
                message: err.message,
            });
        }
    }

}

module.exports = new ContactController();