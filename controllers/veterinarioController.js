import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarid.js";
import emailregistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

//funcion para registrar un nuevo usuario
const registrar = async (req, res) => {
  const { email, nombre } = req.body;
  //prevenir registros duplicados
  const existeUsuario = await Veterinario.findOne({ email: email });
  if (existeUsuario) {
    const error = new Error("El usuario ya existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //guardando un nuevo veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    //enviar el email
    emailregistro({
      email,
      nombre,
      token: veterinarioGuardado.token
    });

    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

//funcion para obtener el perfil
const perfil = (req, res) => {
  const { veterinario } = req;
  res.json(veterinario);
};

//funcion para confirmar la cuenta de los usuarios via token
const confirmar = async (req, res) => {
  const { token } = req.params;
  //consulto la base de datos
  const usuarioConfirmar = await Veterinario.findOne({ token: token });
  //conftimo si el token es valido
  if (!usuarioConfirmar) {
    const error = new Error("El token no es valido"); 
    return res.status(404).json({ msg: error.message });
  }

  //modifco el registro, cambio el estado, elimino el token y guardo nuevamente
  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correcramente" });
  } catch (error) {
    console.log(error);
  }
};

//funcion para auntenticar usuarios
const autenticandoUsuarios = async (req, res) => {
  const { email, password } = req.body;
  //comprobar si el usuario existe
  const usuarioAutenticado = await Veterinario.findOne({ email: email });
  if (!usuarioAutenticado) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //confirmar si el usuario esta autenticado
  if (!usuarioAutenticado.confirmado) {
    const error = new Error("El usuario no esta autenticado");
    return res.status(403).json({ msg: error.message });
  }

  //revisar el password
  if (await usuarioAutenticado.comprobarPassword(password)) {
    //autenticando el usuario, para generar el json web token
/*     console.log(usuarioAutenticado); */
    res.json({
      _id: usuarioAutenticado._id,
      nombre: usuarioAutenticado.nombre,
      email: usuarioAutenticado.email,
      token: generarJWT(usuarioAutenticado.id)
    });

  } else {

    const error = new Error("el Usuario o la Contraseña son incorectos");
    return res.status(403).json({ msg: error.message });
  }
};

//funcion para verificar si el email existe para cambiar la contraseña 
const olvidoPassword = async (req, res) => {

  //leyendo el email del objeto obtenido del request
  const {email} = req.body;
  const ExisteVeterinario = await Veterinario.findOne({email:email});

  if (!ExisteVeterinario) {
    const error = new Error("el veterinario no existe");
    return res.status(400).json({ msg: error.message });
  }
  
  //generando un nuevo token y guardandolo en la base de datos para enviarlo por email 
  try {

    ExisteVeterinario.token = generarId();
    await ExisteVeterinario.save();

    emailOlvidePassword({
      email,
      nombre: ExisteVeterinario.nombre,
      token: ExisteVeterinario.token
    })

    res.json({msg:"Hemos enviado un correo con las instrucciones"});

  } catch (error) {
    console.log(error);
  }

};

//comprobando el token y seguir al siquiente paso para cambiar la contraseña
const comprobarToken = async (req, res) => {

  const {token} = req.params;
  const tokenValido = await Veterinario.findOne({token:token})
  if (tokenValido) {
    //el token es valido, el usuario existe
    res.json({ msg: "Token valido y el usuario existe"});
  }else{
    const error = new Error("el token no es valido");
    return res.status(400).json({ msg: error.message });

  }

};

//modificando el password
const nuevoPassword = async (req, res) => {
  
  const {token} = req.params;// se valida el token que se envio antes
  const {password} = req.body;// se usa para modificar el password

  const veterinario = await Veterinario.findOne({token:token});

  if (!veterinario) {
    const error = new Error("Hubo error");
    return res.status(400).json({ msg: error.message });
  }

  //midificando el token a null y cambiando la contraseña para guardar la nueva contraseña
  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({msg:"password modificada correctamente"})
  } catch (error) {
    console.log(error);
  }

}

/* nueva funcion creada para actualizar los datos del perfil, fue tiempo despues de terminar veterinariocontroller */
const actualizarPerfil = async (req, res) => {
  //se busca el veterinario por id
  const veterinario = await Veterinario.findById(req.params.id) 
  // si el veterinario no existe lanza un error
  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  //extraemos el email, del body
  const { email } = req.body
  //si el email del veterinario es diferente al que esta en el formulario lanza una error
  if (veterinario.email !== req.body.email) {
    const existeEmail = await Veterinario.findOne({ email } )

    if (existeEmail) {
      const error = new Error("El email ingresado ya esta en uso");
      return res.status(400).json({ msg: error.message });
    }
  }

  //se guardan los datos ingresados del formulario en la base de datos
  try {

    veterinario.nombre = req.body.nombre;
    veterinario.web = req.body.web;
    veterinario.telefono = req.body.telefono;
    veterinario.email = req.body.email;

    const veterinarioActualizado = await veterinario.save();
    res.json(veterinarioActualizado);

  } catch (error) {
    console.log(error);
  }
}



/* una nueva funcion para actualizar el password, en este caso se autenticará la contraseña actual y guardara una nueva*/
const actualizarPassword =  async (req, res) => {
  /* leer los datos */
  const {id} = req.veterinario;
  const {pwd_actual, pwd_nueva} = req.body;

  /* comprovar si el veterinario existe */
    //se busca el veterinario por id
    const veterinario = await Veterinario.findById(id) 
    // si el veterinario no existe lanza un error
    if (!veterinario) {
      const error = new Error("Hubo un error");
      return res.status(400).json({ msg: error.message });
    }

  /* comprobar si el password existe */
  if (await veterinario.comprobarPassword(pwd_actual)) {
      /* almacenar el nuevo password */
      veterinario.password = pwd_nueva;
      await veterinario.save();
      res.json({msg: "Password almacenado correctamente"})

  }else{

    const error = new Error("El password actual es incorrecto");
    return res.status(400).json({ msg: error.message });
  }


}  

export {
  registrar,
  perfil,
  confirmar,
  autenticandoUsuarios,
  olvidoPassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword,
};
