import express from "express";
import rootRoutes from './src/routes/rootRoutes.js'
import cors from 'cors'


const app = express();

app.use(cors({
    origin: "https://localhost:3000",
    credentials: true
}))



app.use(express.json());

app.use(rootRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal server"
    })
})

app.listen(8080, () => {
    console.log("BE starting with 8080");
})