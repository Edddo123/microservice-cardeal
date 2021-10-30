import mongoose from "mongoose";
import { BuyerInterface } from "../buyer/buyer-model";

export enum PostState {
  Active = "active",
}

export interface PostInterface {
  _id: string;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  state: PostState;
  buyer: BuyerInterface;
  createdAt: string;
  updatedAt: string;
}

const postSchema = new mongoose.Schema<PostInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<PostInterface>("Post", postSchema);

export { Post };
