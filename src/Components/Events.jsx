import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const options = {
        method: "GET",
        url: "https://sofascore.p.rapidapi.com/tournaments/get-scheduled-events",
        params: { categoryId: "1" },
        headers: {
          "X-RapidAPI-Key":
            "c72c804f5bmsh5f8cd831b7aa9a8p1fc11ejsn9d8306a795a3",
          "X-RapidAPI-Host": "sofascore.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data); // Check the structure of response.data
        setEvents(response.data.events); // Assuming events are under a property named 'events'
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  console.log(events);

  return (
    <Layout>
      <div className="Events">
        <div className="events-container">
          <h1 className="scheduled-events">Scheduled Matches</h1>
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="loading">Error: {error}</p>}
          <div className="events-section">
            {events
              .filter((match) => match.tournament.slug === "premier-league")
              .map((event) => (
                <div className="event-card" key={event.id}>
                  <div className="event-card-top">
                    <div className="event-round">
                      EPL R{event.roundInfo.round}
                    </div>
                    <div className="event-status">
                      {event.status.description}
                    </div>
                  </div>
                  <div className="event-card-bottom">
                    <div className="ec-bottom-left">
                      <div className="events-teamname">
                        {event.homeTeam.name}
                      </div>
                      <div className="events-teamname">
                        {event.awayTeam.name}
                      </div>
                    </div>
                    <div className="ec-bottom-right">
                      <div className="event-time-text">Today</div>
                      <div className="event-time">
                        {new Date(
                          event.startTimestamp * 1000
                        ).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
