import mongoose from "mongoose";

const BlackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24, // 24 hours
  },
});

const BlackListToken = mongoose.model("BlackListedTokens", BlackListTokenSchema);

export default BlackListToken;