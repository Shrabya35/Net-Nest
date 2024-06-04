import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import "./Component.css";

const LiveEvents = () => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveEvents = async () => {
      const options = {
        method: "GET",
        url: "https://sofascore.p.rapidapi.com/tournaments/get-live-events",
        params: { categoryId: "1" },
        headers: {
          "X-RapidAPI-Key":
            "c72c804f5bmsh5f8cd831b7aa9a8p1fc11ejsn9d8306a795a3",
          "X-RapidAPI-Host": "sofascore.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setLiveEvents(response.data.events);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch events.");
        setLoading(false);
      }
    };

    const interval = setInterval(fetchLiveEvents, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="Events">
        <div className="events-container">
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="loading">Error: {error}</p>}
          {liveEvents.length === 0 && !loading && (
            <p className="loading">No Live Matches currently</p>
          )}
          <div className="events-section">
            {liveEvents
              .filter(
                (match) =>
                  match.tournament.slug === "premier-league" &&
                  match.country.slug === "england"
              )
              .map((event) => (
                <div className="event-card" key={event.id}>
                  <div className="event-card-top">
                    <div className="event-round">
                      EPL R{event.roundInfo.round}
                    </div>
                    <div className="event-status">
                      <div className="event-time-text">
                        {new Date(
                          event.time.currentPeriodStartTimestamp * 1000
                        ).toLocaleString()}
                      </div>
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
                      <div className="event-time-text">
                        {event.homeScore.current}
                      </div>
                      <div className="event-time">
                        {event.awayScore.current}
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

export default LiveEvents;
