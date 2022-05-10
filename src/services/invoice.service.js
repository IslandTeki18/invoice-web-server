import Invoice from "../models/invoice.model";

//@desc     Get all Invoices
//@route    GET /api/invoices/
//@access   Private
const getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find({});
    if (!invoices){
        res.status(404)
        throw new Error("No Invoices Found.")
    };
    res.status(200).send(invoices);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Get Single Invoice
//@route    GET /api/invoices/:id
//@access   Private
const getSingleInvoice = async (req, res, next) => {
  try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) {
          res.status(404)
          throw new Error("")
      }
      res.status(200).send(invoice)
  } catch (error) {
      res.status(500);
      next(error)
  }
};

//@desc     Create an invoice
//@route    POST /api/invoices/
//@access   Private
const createInvoice = async (req, res, next) => {
  try {
      const newInvoice = new Invoice({
          header: req.body.header,
          company: {
              name: req.body.company.name,
              email: req.body.company.email,
              address: req.body.company.address,
              phone: req.body.company.phone,
              businessNumber: req.body.company.businessNumber,
          },
          billTo: {
            name: req.body.billTo.name,
            email: req.body.billTo.email,
            address: req.body.billTo.address,
            phone: req.body.billTo.phone,
          },
          invoiceNumber: req.body.invoiceNumber,
          date: Date(),
          terms: req.body.terms,
          items: req.body.newItems,
          subTotal: req.body.subTotal,
          tax: {
              type: req.body.tax.type,
              label: req.body.tax.label,
              rate: req.body.tax.label,
              isInclusive: req.body.tax.isInclusive || false,
          },
          hasDiscount: req.body.hasDiscount || false,
          discount: {
              type: req.body.discount.type || "None",
              percent: req.body.discount.percent,
              flatAmount: req.body.flatAmount
          },
          currency: req.body,currency,
          total: req.body.total,
          isOutstanding: req.body.isOutstanding || false,
          hasPaid: req.body.hasPaid || false,
          companyLogo: req.body.companyLogo
      })
      await newInvoice.save()
      res.status(200).send(newInvoice)
  } catch (error) {
      res.status(500);
      next(error)
  }
};

//@desc     Update Invoice
//@route    PUT /api/invoices/:id
//@access   Private
const updateInvoice = async (req, res, next) => {
  try {
      const invoice = await Invoice.updateOne({_id: req.params.id},);
      if (!invoice) {
          res.status(404);
          throw new Error("No Invoice Found.")
      }
  } catch (error) {}
};

//@desc     Delete an Invoice
//@route    DELETE /api/invoices/:id
//@access   Private
const deleteInvoice = async (req, res, next) => {};

export {
  getAllInvoices,
  getSingleInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
