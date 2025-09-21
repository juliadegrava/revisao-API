import express from "express";
import dotenv from "dotenv";
import cartasRoutes from "./src/routes/cartasRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3003;

app.get("/", (req,res)=> {
    res.send("servidor funcionando")
});

app.use("/cartas", cartasRoutes);

app.listen(serverPort, () => {
    console.log(`servidor rodando em http://localhost:${serverPort}`);
});