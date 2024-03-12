import express from "express";
import getFlights from "./get-flights.js"
import path from "path";
import cors from "cors";

const app = express();
app.use(cors({ origin: "https://www.bing.com" }));

app.get("/get-flights", (req, res) => {
    const departure_airport = req.query.departure;
    const destination_airport = req.query.destination;
    const departure_time = req.query.date;
    const connections = parseInt(req.query.connections);
  
    try {
      const flights = getFlights(departure_airport, destination_airport, departure_time, connections);
      res.send(flights);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
});

app.get("/openapi.yaml", (req, res) => {
    res.sendFile(path.resolve() + "/openapi.yaml");
});

app.get("/.well-known/ai-plugin.json", (req, res) => {
  res.sendFile(path.resolve() + "/ai-plugin.json");
});

app.get("/logo.png", (req, res) => {
  res.sendFile(path.resolve() + "/logo.png");
});

app.listen(8080);