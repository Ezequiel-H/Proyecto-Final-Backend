import mongooseLib from "mongoose";

export const mongoose = mongooseLib;

export const initDatabase = () => {
  const connectionString =
    process.env.DB == "atlas"
      ? `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.cbnf0w7.mongodb.net/?retryWrites=true&w=majority`
      : "mongodb://127.0.0.1:27017/proyectoX";

  mongoose.connect(connectionString);
  return mongoose;
};

export const schema = mongoose.Schema;
