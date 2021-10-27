import mongoose from "mongoose";

interface BuyerInterface {
  email: string;
  password: string;
  personalId: number;
  createdAt: string;
  updatedAt: string;
}

const buyerSchema = new mongoose.Schema<BuyerInterface>(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    personalId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Buyer = mongoose.model<BuyerInterface>("Buyer", buyerSchema);

export { Buyer };
