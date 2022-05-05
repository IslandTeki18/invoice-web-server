import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  phoneNumber: String,
  businessNumber: String,
  businessLogo: String,
});

const User = mongoose.model("User", userSchema);
export default User;
