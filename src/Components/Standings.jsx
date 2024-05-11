import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";
import "./Component.css";

const Standings = () => {
  const [standings, setStandings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const APIkey =
        "d138de469e9d65b4b145f86b2d724fb0d75100e86e4863a5190484bf1c82c80c";
      const league_id = 152;

      try {
        const response = await axios.get(
          `https://apiv3.apifootball.com/?action=get_standings&league_id=${league_id}&APIkey=${APIkey}`
        );

        if (response.status !== 200) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = response.data;

        if (data.error) {
          throw new Error(`API Error: ${data.error}`);
        }

        setStandings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPromotion = (promotion) => {
    if (promotion.includes("Champions League")) {
      return "#4285f4";
    } else if (promotion.includes("Europa League")) {
      return "#fa7b17";
    } else if (promotion.includes("Relegation")) {
      return "#ea4335";
    }
    return " #171717";
  };

  return (
    <Layout>
      <div className="Standings">
        {loading && <p className="loading">Loading...</p>}
        {error && <p>{error}</p>}
        {standings && (
          <div className="table-container">
            <table className="league-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Club</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => (
                  <tr
                    key={index}
                    style={{
                      borderLeft: `.25rem solid ${getPromotion(
                        team.overall_promotion
                      )}`,
                    }}
                  >
                    <td>{team.overall_league_position}</td>
                    <td>
                      <Link to={`/team/${team.team_id}`}>{team.team_name}</Link>
                    </td>
                    <td>{team.overall_league_payed}</td>
                    <td>{team.overall_league_W}</td>
                    <td>{team.overall_league_D}</td>
                    <td>{team.overall_league_L}</td>
                    <td>{team.overall_league_GF}</td>
                    <td>{team.overall_league_GA}</td>
                    <td>{team.overall_league_GF - team.overall_league_GA}</td>
                    <td>{team.overall_league_PTS}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="table-info">
              <div className="table-info-title">Qualification/Relegation</div>
              <div className="table-info-desc">
                <div className="tid">
                  <div className="tid-colour TID1"></div>
                  UEFA Champions League Group Stage
                </div>
                <div className="tid">
                  <div className="tid-colour TID2"></div>
                  Europa League Group Stage
                </div>
                <div className="tid">
                  <div className="tid-colour TID3"></div>
                  Relegation
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Standings;
