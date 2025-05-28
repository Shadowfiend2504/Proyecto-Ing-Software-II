import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/proyectoEstudiantil");
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    console.log("Base de no datos conectada");
  }
};
