import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    description: String,
    rate: Number,
    additionalDetails: String,
    quanity: Number,
    isTaxable: Boolean,
  },
  { timestamps: true }
);

const estimateSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    header: String,
    company: {
      name: String,
      email: String,
      address: String,
      phone: String,
      businessNumber: String,
    },
    billTo: {
      name: String,
      email: String,
      address: String,
      phone: String,
    },
    estimateNumber: String,
    date: Date(),
    terms: String,
    items: [itemSchema],
    subTotal: String,
    tax: {
        type: String,
        label: String,
        rate: mongoose.Types.Decimal128,
        isInclusive: Boolean
    },
    hasDiscount: Boolean,
    discount: {
        type: {
            type:String,
            default: "None",
            enum: ["None", "Percent", "Flat Amount"]
        },
        percent: Number,
        flatAmount: mongoose.Types.Decimal128
    },
    currency: String,
    total: Number,
    isOutstanding: Boolean,
    isPaid: Boolean,
    companyLogo: String,
  },
  {
    timestamps: true,
  }
);

const Estimate = mongoose.model("Estimate", estimateSchema);

export default { Estimate };
