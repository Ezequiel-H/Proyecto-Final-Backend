import mongooseLib from "mongoose";

export const mongoose = mongooseLib;

export const initDatabase = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.cbnf0w7.mongodb.net/?retryWrites=true&w=majority`
  );
  return mongoose;
};

export const schema = mongoose.Schema;
