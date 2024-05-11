import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY =
        "d138de469e9d65b4b145f86b2d724fb0d75100e86e4863a5190484bf1c82c80c";
      const league_id = 152;
      const from = "2024-05-10";
      const to = "2024-05-10";

      try {
        const response = await axios.get(
          `https://apiv3.apifootball.com/?action=get_events&from=${from}&to=${to}&league_id=${league_id}&APIkey=${API_KEY}`
        );

        console.log("Response status:", response.status);
        console.log("Response data:", response.data);

        if (response.status !== 200) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = response.data;

        if (data.error) {
          throw new Error(`API Error: ${data.error}`);
        }

        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="loading">{error}</p>}
        {events && (
          <div className="events-container">
            <h1>Events</h1>
            <ul>
              {events.map((event) => (
                <li key={event.match_id}>
                  <div>Date: {event.match_date}</div>
                  <div>Home Team: {event.match_hometeam_name}</div>
                  <div>Away Team: {event.match_awayteam_name}</div>
                  <div>
                    Final Score: {event.match_hometeam_score} -
                    {event.match_awayteam_score}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Events;
