import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConexionDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

//creando el servidor
const app = express();

//le vamos a enviar tipos de json
app.use(express.json());

//unsando variables de entorno
dotenv.config();

//creando la conxion a mongo db
ConexionDB();

//permitiendo que se hagan peticiones de url permitidas
const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback) {
      if (dominiosPermitidos.indexOf(origin) !== -1) {
        //el origen de la peticion esta permitida
        callback(null, true)
        
      }else{
        callback(new Error('No permitido por CORS')) 
      }
    }
}
app.use(cors(corsOptions));

//usando las rutas del router veterinarios
app.use('/api/veterinarios', veterinarioRoutes)

//usando las rutas del router pacientes
app.use('/api/pacientes', pacienteRoutes)

//ejecuntando el servidor en el puerto 4000
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`server running on por ${PORT}`);
});
