import express from "express";
import {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacienteController.js";
import checkAut from "../middleware/authMiddleware.js";
const router = express.Router();

//hace refencia a la ruta /api/pacientes, usamos la misma url para guardar y obtener pacientes
router
  .route("/")
  .post(checkAut, agregarPaciente)
  .get(checkAut, obtenerPacientes);

//hace refencia a la ruta /api/pacientes/id, usamos la misma url para obtener un paciente, actualizar y eliminar
router
  .route("/:id")
  .get(checkAut, obtenerPaciente)
  .put(checkAut, actualizarPaciente)
  .delete(checkAut, eliminarPaciente);

export default router;
