import mongoose from "mongoose";

const schemaUsuario = new mongoose.Schema(
  {
    usuario: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    clave: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    esAdministrador: {
      type: Boolean,
      require: false,
    },
    nombres: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    direccionResidencia: {
      type: String,
      required: true,
    },
    eps: {
      type: String,
      required: true,
    },
    cedula: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    numeroContacto: {
      type: Number,
      required: true,
      trim: true,
    },
    esEstudiante: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Usuario", schemaUsuario);
