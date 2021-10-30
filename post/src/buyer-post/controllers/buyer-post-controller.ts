/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RequestHandler } from "express";
import { Buyer } from "../../buyer/buyer-model";
import { Post, PostState } from "../post-model";

export const createBuyerPost: RequestHandler = async (req, res) => {
  const { name, description, minPrice, maxPrice } = req.body;
  const buyer = await Buyer.findById(req.currentUser?.id);
  if (!buyer) {
    throw new Error("Buyer does not exist");
  }

  const post = new Post({
    buyer,
    name,
    description,
    minPrice,
    maxPrice,
    state: PostState.Active,
  });

  await post.save();

  res.status(201).send(post);
};

export const getBuyerPosts: RequestHandler = async (req, res) => {
  // @ts-ignore
  const post = await Post.find({
    buyer: req.currentUser?.id,
  }).populate("buyer");

  res.send(post);
};

export const deleteBuyerPost: RequestHandler = async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.postId,
    // @ts-ignore
    buyer: req.currentUser?.id,
  });

  if (!post) {
    throw new Error("Can not delete non existent posts");
  }

  await Post.deleteOne({ _id: post._id });

  res.send(post);
};
