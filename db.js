import mongooseLib from "mongoose";

export const mongoose = mongooseLib;

export const initDatabase = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/proyectoX");
  return mongoose;
};

export const schema = mongoose.Schema;
