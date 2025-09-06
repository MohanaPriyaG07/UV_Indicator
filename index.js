import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const yourAPIKey = process.env.API_KEY;

const app = express();
const port = 3000;
const API_URL = "https://api.openuv.io/api/v1/uv";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// const yourAPIKey = "openuv-1yi1qb5rmcogd509-io";

app.get("/", (req, res) => {
    res.render("index.ejs", {content: "SPF Recommendation"});
});

const config = {
    headers: {'x-access-token': yourAPIKey,}
};

app.post("/apiKey", async (req, res) => {
    const lat = req.body.latitude;
    const lng = req.body.longitude;
    try{
        const result = await axios.get(`${API_URL}?lat=${lat}&lng=${lng}`, config);
        const data = result.data;
        res.render("index.ejs", {content: data});
    } catch (error){
        res.status(404).send(error.message);
    }
});

app.listen(port, (req, res) => {
    console.log("Listening to the port: " + port);
});