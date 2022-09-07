import Jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

/*  creando un propio middleware para autenticar el json web token, si se hace la autenticacion correctamente va al controlador veterinarioController y se usa la funcion autenticandoUsuarios */

const checkAut = async (req, res, next) => {
  let token; //se almacenara el json web token

  //se valida si el json web token es valido y si tiene bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // asignamos el JWT a la variable, hacemos un split para quitar bearer del JWt
      const decoded = Jwt.verify(token, process.env.JWT_SECRET); // verificamos el JWT con una funcion propia de jsonwebtoken y usando la variable de ambiente
      req.veterinario = await Veterinario.findById(decoded.id).select(
        "-password -token -confirmado"
      ); //creamos una sesion en el servidor, obtenemos un objeto con la informacion del perfil. Quitamos los datos sensibles del objeto
      return next();
    } catch (error) {
      const e = new Error("token no valido");
      return res.status(403).json({ msg: e.message });
    }
  }

  if (!token) {
    const error = new Error("token no valido o inexistente");
    return res.status(403).json({ msg: error.message });
  }

  next();
};

export default checkAut;
