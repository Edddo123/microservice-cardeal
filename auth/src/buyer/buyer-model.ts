import mongoose from "mongoose";

export enum BuyerState {
  Active = "active",
  Banned = "banned",
}

export enum UserPrivilage {
  Standard = "standard",
  Admin = "admin",
}

export interface BuyerInterface {
  _id: string;
  email: string;
  password: string;
  personalId: number;
  state: BuyerState;
  privilage: UserPrivilage;
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
    state: {
      type: String,
      required: true,
    },
    privilage: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Buyer = mongoose.model<BuyerInterface>("Buyer", buyerSchema);

export { Buyer };
