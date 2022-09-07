import Paciente from "../models/Paciente.js";
// aqui estamos haciendo las funcionabilidad basica de CRUD

//guardando un paciente nuevo
const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;

 //guardando en la base de datos
  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

// coonsultar todos los pacientes, de un veterinario
const obtenerPacientes = async (req, res) => {
    //consulta a la base de datos y trae los pacientes que tiene el veterinario
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);
  res.json(pacientes);
};

//obtiene un paciente
const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  //validando si el paxiente existe
  if (!paciente) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

/*valida si el id del veterinario esta validado por el middleware,
  para que otro veterinario no validado haga cambios */
  if (
    paciente.veterinario._id.toString() !==
    req.veterinario._id.toString()
  ) {
    return res.json({ msg: "Accion no valida" });
  }

  res.json(paciente);
};

//actualiza los datos de un paciente ya guardado
const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  //validando si el paxiente existe
  if (!paciente) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  /*valida si el id del veterinario esta validado por el middleware,
  para que otro veterinario no validado haga cambios */
  if (
    paciente.veterinario._id.toString() !==
    req.veterinario._id.toString()
  ) {
    return res.json({ msg: "Accion no valida" });
  }

  /* preparando los parametros para actualizar el paciente,
    si se actualiza un campo y no se proveen los demas toma por defecto los que tenia antes*/
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  //guardando en la base de datos
  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
  }
};

//elimando registros
const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  //validando si el paxiente existe
  if (!paciente) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  /*valida si el id del veterinario esta validado por el middleware,
  para que otro veterinario no validado haga cambios */
  if (
    paciente.veterinario._id.toString() !==
    req.veterinario._id.toString()
  ) {
    return res.json({ msg: "Accion no valida" });
  }

  //eliminando de la base de datos
  try {
    await paciente.deleteOne();
    res.json({ msg: "paciente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
