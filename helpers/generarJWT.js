import jwt from "jsonwebtoken";
/* generando un json web token, que recibe el id del usuario del controlador veterinarioController,
    el token expira en 30 dias */
const generarJWT = (id) => {
    return jwt.sign({id:id}, process.env.JWT_SECRET,{
        expiresIn: "30d"
    });
}

export default generarJWT;