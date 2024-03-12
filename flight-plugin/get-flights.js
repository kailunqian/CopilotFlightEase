import flights from "./flights.json" assert { type: "json" };

// Return only the first 5 results.
const RESULT_LIMIT = 5;

export default function getFlights(departure_airport, destination_airport, departure_time, connections) {
  return flights.filter(flights => {
    const departure_airport_match = departure_airport
      ? flights.departure_airport.toLowerCase() === departure_airport.toLowerCase()
      : true;

    const destination_airport_match = destination_airport
      ? flights.destination_airport.toLowerCase() === destination_airport.toLowerCase()
      : true;

    const departure_date_match = departure_time
      ? new Date(flights.departure_time).getDate() === new Date(departure_time).getDate()
      : true;

    const connectionsMatch = connections
      ? flights.connections <= connections
      : true;

    return departure_airport_match && destination_airport_match && departure_date_match && connectionsMatch;
  }).slice(0, RESULT_LIMIT);
}