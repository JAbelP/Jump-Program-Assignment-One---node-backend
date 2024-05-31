import express from "express";
import routers from "./routes/routes"

const app = express();

//middlware
app.use(express.json()); // [TODO] :ask what this does exactly
app.use(express.urlencoded({ extended: false })); // [TODO] :ask what this is

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

app.use("/api/videogames", routers);
app.listen(port, () =>
  console.log(`Server listening on port  at http://${host}:${port}`)
);
