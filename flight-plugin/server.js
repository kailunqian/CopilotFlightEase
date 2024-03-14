import express from "express";
import getFlights from "./get-flights.js"
import getCalendar from "./get-calendar.js"
import getAccounts from "./get-accounts.js"
import bookFlights from "./post-flight.js";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors({ origin: "https://www.bing.com" }));

app.get("/get-flights", (req, res) => {
    const departure_airport = req.query.departureAirport;
    const destination_airport = req.query.destinationAirport;
    const departure_city = req.query.departureCity;
    const destination_city = req.query.destinationCity;
    const date = req.query.date;
    const dateRangeStart = req.query.dateRangeStart;
    const dateRangeEnd = req.query.dateRangeEnd;
    const stops = parseInt(req.query.stops);
    const flightClass = req.query.class;
  
    try {
        const flights = getFlights(departure_airport, destination_airport, departure_city, destination_city, date, dateRangeStart, dateRangeEnd, stops, flightClass);
        res.send(flights);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
});


app.get("/get-accounts", (req, res) => {
  try {
    const accounts = getAccounts();
    res.send(accounts);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get("/get-calendar", (req, res) => {
  try {
    const calendar = getCalendar();
    res.send(calendar);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get("/book", (req, res) => {
  const airline = req.query.airline;
  const departure_airport = req.query.departure;
  const destination_airport = req.query.destination;
  const date = req.query.date;
  const flightClass = req.query.class;

  try {
    const result = bookFlights(airline, departure_airport, destination_airport, date, flightClass);
    if (result === "success")
      res.send("success");
    else 
      rres.status(400).send({ error: result });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
})

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