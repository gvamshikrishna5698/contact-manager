const contactService = require("../service/contactService");

const getContacts = (req, res) => {
  let contacts = contactService.getContacts();
  contacts.then(
    (data) => {
      res.send(data);
    },
    (err) => {
      res.status(500);
      res.send("Failed to retrieve information from DB: " + err.message);
    }
  );
};

const getContact = (req, res) => {
  const { id } = req.params;
  let contacts = contactService.getContact(id);
  contacts.then(
    (data) => {
      res.send(data[0]);
    },
    (err) => {
      res.status(500);
      res.send("Failed to retrieve information from DB: " + err.message);
    }
  );
};
const addContact = (req, res) => {
  let result = contactService.addContact(req.body);
  result.then(
    (data) => {
      res.status(200);
      res.send(`${data.insertId}`);
    },
    (err) => {
      res.status(500);
      res.send("Failed to insert information from DB: " + err.message);
    }
  );
};

const updateContact = (req, res) => {
  let result = contactService.updateContact(req.body);
  result.then(
    (data) => {
      res.status(200);
      res.send(`${data.affectedRows}`);
    },
    (err) => {
      res.status(500);
      res.send("Failed to insert information from DB: " + err.message);
    }
  );
};

const deleteContact = (req, res) => {
  const { id } = req.params;
  let contacts = contactService.deleteContact(id);
  contacts.then(
    (data) => {
      res.status(200);
      res.send(`${data.affectedRows}`);
    },
    (err) => {
      res.status(500);
      res.send("Failed to delete information from DB: " + err);
    }
  );
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
};
