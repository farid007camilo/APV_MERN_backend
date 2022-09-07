import express from "express";
const router = express.Router();
import {
  registrar,
  perfil,
  confirmar,
  autenticandoUsuarios,
  olvidoPassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword
} from "../controllers/veterinarioController.js";
import checkAut from "../middleware/authMiddleware.js"

/* area publica */
//esta ruta hace referncia a api/veterinarios
router.post("/", registrar);
//esta ruta hace referncia a api/veterinarios/confirmar/:token
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticandoUsuarios);
//endpoint para recuperacion de contraseña
router.post("/olvido-password", olvidoPassword)
router.route("/olvido-password/:token").get(comprobarToken).post(nuevoPassword)


/* area privada */
//esta ruta hace referncia a api/veterinarios/login
router.get("/perfil", checkAut ,perfil);

/* esta ruta hace refencia una variable de url que esta en la funcion actualizarperfil del archivo AuthProvider.jsx, esta ruta fue creada tiempo despues de terminar veterianrioRoutes*/
router.put("/perfil/:id", checkAut, actualizarPerfil)

/* esta ruta hace refencia una variable de url que esta en la funcion guardarPassword del archivo AuthProvider.jsx, esta ruta fue creada tiempo despues de terminar veterianrioRoutes */
router.put("/actualizar-password", checkAut, actualizarPassword)

export default router;
