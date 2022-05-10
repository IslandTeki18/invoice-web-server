import Client from "../models/client.model";

//@desc     Get all Clients
//@route    GET /api/clients/
//@access   Private
const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find({});
    if (!clients) {
      res.status(404);
      throw new Error("Clients not found.");
    }
    res.status(200).send(clients);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Get Single Client
//@route    GET /api/clients/:id
//@access   Private
const getSingleClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      res.status(404);
      throw new Error("Client not found.");
    }
    res.status(200).send(client);
  } catch (error) {
    res.status(404);
    next(error);
  }
};

//@desc     Create an Client
//@route    POST /api/clients/
//@access   Private
const createClient = async (req, res, next) => {
  try {
    const newClient = new Client({
      name: req.body.name,
      email: req.body.email,
      address: {
        addressOne: req.body.address.addressOne,
        city: req.body.address.city,
        country: req.body.address.country,
      },
      phone: req.body.phone,
      cellPhone: req.body.cellPhone,
      fax: req.body.fax,
    });
    await newClient.save();
    res.status(200).send(newClient);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Update Client
//@route    PUT /api/clients/:id
//@access   Private
const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      res.status(404);
      throw new Error("Client not found.");
    }
    client.name = req.body.name || client.name;
    client.email = req.body.email || client.email;
    (client.address = {
      addressOne: req.body.address.addressOne || client.address.addressOne,
      city: req.body.address.city || client.address.city,
      country: req.body.address.country || client.address.country,
    }),
      (client.phone = req.body.phone || client.phone);
    client.fax = req.body.fax || client.fax;
    await client.save();
    res.status(200).send(client);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Delete an Client
//@route    DELETE /api/clients/:id
//@access   Private
const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      res.status(404);
      throw new Error("Client Not Found.");
    }
    await client.remove();
    res.status(200).json({ msg: "Client successfully removed." });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

export {
  getAllClients,
  getSingleClient,
  createClient,
  updateClient,
  deleteClient,
};
