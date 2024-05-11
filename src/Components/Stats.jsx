import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import "./Component.css";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const APIkey =
        "d138de469e9d65b4b145f86b2d724fb0d75100e86e4863a5190484bf1c82c80c";
      const league_id = 152;

      try {
        const response = await axios.get(
          `https://apiv3.apifootball.com/?action=get_topscorers&league_id=${league_id}&APIkey=${APIkey}`
        );

        if (response.status !== 200) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = response.data;

        if (data.error) {
          throw new Error(`API Error: ${data.error}`);
        }

        setStats(data);
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
      <div className="Stats">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="loading">{error}</p>}
        {stats && (
          <div className="table-container">
            <table className="stats-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Player</th>
                  <th>Goals</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((player, index) => (
                  <tr key={index}>
                    <td>{player.player_place}.</td>
                    <td>
                      {player.player_name} <br />
                      <span className="player-team">{player.team_name}</span>
                    </td>
                    <td>
                      {player.goals}({player.penalty_goals})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Stats;
