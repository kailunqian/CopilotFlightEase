import flights from "./flights.json" assert { type: "json" };

// Return only the first 5 results.
const RESULT_LIMIT = 5;

export default function getFlights(departure_airport, destination_airport, date, dateRangeStart, dateRangeEnd, departure_time_end, connections, flightClass) {
  return flights.filter(flights => {
    const departure_airport_match = departure_airport
      ? flights.departure_airport.toLowerCase() === departure_airport.toLowerCase()
      : true;

    const destination_airport_match = destination_airport
      ? flights.destination_airport.toLowerCase() === destination_airport.toLowerCase()
      : true;

    var departure_date_match = true;

    if(date){
      departure_date_match = new Date(flights.departure_time).getDate() === new Date(date).getDate()
      && new Date(flights.departure_time).getMonth() === new Date(date).getMonth()
      && new Date(flights.departure_time).getFullYear() === new Date(date).getFullYear()
    }
    else if(dateRangeStart && dateRangeEnd){
      departure_date_match = new Date(flights.departure_time) >= new Date(dateRangeStart)
       && new Date(flights.departure_time) <= new Date(dateRangeEnd)
    }
    else if(dateRangeStart){
      departure_date_match = new Date(flights.departure_time) >= new Date(dateRangeStart)
    }

    const connectionsMatch = connections>=0 ? flights.connections <= connections : true;

    const flightClassMatch = flightClass
    ? flights.class.toLowerCase() == flightClass.toLowerCase()
    : true;

    return departure_airport_match && destination_airport_match && departure_date_match && connectionsMatch && flightClassMatch;
  }).sort((a, b) => {
    return a.price - b.price;
  }).slice(0, RESULT_LIMIT);
}