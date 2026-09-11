const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Monthly income entered during financial setup
    monthlyIncome: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Monthly essential expenses entered during financial setup
    monthlyEssentials: {
      rent: {
        type: Number,
        default: 0,
        min: 0,
      },

      food: {
        type: Number,
        default: 0,
        min: 0,
      },

      bills: {
        type: Number,
        default: 0,
        min: 0,
      },

      transport: {
        type: Number,
        default: 0,
        min: 0,
      },

      other: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    // Used to decide whether the user has completed onboarding
    financialSetupCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);