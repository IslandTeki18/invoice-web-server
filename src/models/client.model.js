import mongoose from "mongoose";
const {Schema} = mongoose;

const clientSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        addressOne: String,
        city: String,
        country: String
    },
    phone: String,
    cellPhone: String,
    fax: String
},
{
    timestamps: true
})

const Client = mongoose.model("Client", clientSchema);
export default Client;