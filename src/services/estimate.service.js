import Estimate from "../models/estimate.model.js";

//@desc     Get all Estimates
//@route    GET /api/estimates/
//@access   Private
const getAllEstimates = async (req, res, next) => {
  try {
    const estimates = await Estimate.find({});
    if (!estimates) {
      res.status(404);
      throw new Error("No Estimates Found.");
    }
    res.status(200).send(estimates);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Get Single Estimate
//@route    GET /api/estimates/:id
//@access   Private
const getSingleEstimate = async (req, res, next) => {
  try {
    const estimate = await Estimate.findById(req.params.id);
    if (!estimate) {
      res.status(404);
      throw new Error("No Estimate Found.");
    }
    res.status(200).send(estimate);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Create an Estimate
//@route    POST /api/estimates/
//@access   Private
const createEstimate = async (req, res, next) => {
  try {
    const newEstimate = new Estimate({
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
      estimateNumber: req.body.invoiceNumber,
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
        flatAmount: req.body.flatAmount,
      },
      currency: req.body.currency,
      total: req.body.total,
      isOutstanding: req.body.isOutstanding || false,
      hasPaid: req.body.hasPaid || false,
      companyLogo: req.body.companyLogo,
    });

    await newEstimate.save();
    res.status(200).send(newEstimate);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Update Estimate
//@route    PUT /api/estimates/:id
//@access   Private
const updateEstimate = async (req, res, next) => {
  try {
    const estimate = await Estimate.findById(req.params.id);
    if (!estimate) {
      res.status(404);
      throw new Error("Estimate not found.");
    }
    estimate.header = req.body.header || estimate.header;
    estimate.company =
      {
        name: req.body.company.name || estimate.company.name,
        email: req.body.company.email || estimate.company.email,
        address: req.body.company.address || estimate.company.address,
        phone: req.body.company.phone || estimate.company.phone,
        businessNumber:
          req.body.company.businessNumber || estimate.company.businessNumber,
      } || estimate.company;
    estimate.billTo =
      {
        name: req.body.billTo.name || estimate.billTo.name,
        email: req.body.billTo.email || estimate.billTo.email,
        address: req.body.billTo.address || estimate.billTo.address,
        phone: req.body.billTo.phone || estimate.billTo.phone,
      } || estimate.billTo;
    estimate.estimateNumber =
      req.body.estimateNumber || estimate.estimateNumber;
    estimate.date = req.body.date || estimate.date;
    estimate.terms = req.body.terms || estimate.terms;
    estimate.items = req.body.items || estimate.items;
    estimate.subTotal = req.body.subTotal || estimate.subTotal;
    estimate.tax = req.body.tax || estimate.tax;
    estimate.hasDiscount = req.body.hasDiscount || estimate.hasDiscount;
    estimate.discount =
      {
        type: req.body.discount.type || estimate.discount.type,
        percent: req.body.discount.percent || estimate.discount.percent,
        flatAmount:
          req.body.discount.flatAmount || estimate.discount.flatAmount,
      } || estimate.discount;
    estimate.currency = req.body.currency || estimate.currency;
    estimate.total = req.body.total || estimate.total;
    estimate.isOutstanding = req.body.isOutstanding || estimate.isOutstanding;
    estimate.isPaid = req.body.isPaid || estimate.isPaid;
    estimate.companyLogo = req.body.companyLogo || estimate.companyLogo;

    await estimate.save();
    res.status(200).send(estimate);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Delete an Estimate
//@route    DELETE /api/estimates/:id
//@access   Private
const deleteEstimate = async (req, res, next) => {
  try {
    const estimate = await Estimate.findById(req.params.id);
    if (!estimate) {
      res.status(404);
      throw new Error("No Estimate Found.");
    }
    await estimate.remove();
    res.status(200).json({ msg: "Estimate Successfully Removed!" });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

export { getAllEstimates, getSingleEstimate, createEstimate, updateEstimate, deleteEstimate };
