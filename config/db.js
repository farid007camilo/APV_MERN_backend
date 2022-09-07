import mongoose from "mongoose";

const ConexionDB = async () => {
  try {
    const CnxDatabase = await mongoose.connect(process.env.MONGO_URI, {
      UseNewUrlParser: true,
      UseUnifiedTopology: true,
    });
    const url = `${CnxDatabase.connection.host}:${CnxDatabase.connection.port}`;
    console.log(`Mongo db conectado en ${url}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default ConexionDB;
