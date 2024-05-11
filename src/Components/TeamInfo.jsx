import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../layout/Layout";

const TeamInfo = () => {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const APIkey =
          "d138de469e9d65b4b145f86b2d724fb0d75100e86e4863a5190484bf1c82c80c";
        const response = await axios.get(
          `https://apiv3.apifootball.com/?action=get_teams&team_id=${teamId}&APIkey=${APIkey}`
        );

        if (response.status !== 200) {
          throw new Error(`Failed to fetch team data: ${response.statusText}`);
        }

        setTeamData(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error.message);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  return (
    <Layout>
      <div className="TeamInfo">
        {loading ? (
          <p className="loading">Loading team data...</p>
        ) : (
          teamData && (
            <div className="team-container">
              <div className="team-data">
                <img src={teamData.team_badge} className="team-badge" alt="" />
                <div className="teaminfo-name">{teamData.team_name} </div>
              </div>

              <div className="team-players">
                <div className="players-section">
                  <h1 className="player-position-title">Goalkeepers</h1>
                  <div className="players-container">
                    {teamData.players
                      .filter((player) => player.player_type === "Goalkeepers")
                      .map((player) => (
                        <div
                          className="player-container"
                          key={player.player_key}
                        >
                          <img
                            src={player.player_image}
                            alt={player.player_name}
                          />
                          <h2>{player.player_name}</h2>
                          <h5>{player.player_age} year old</h5>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="players-section">
                  <h1 className="player-position-title">Defenders</h1>
                  <div className="players-container">
                    {teamData.players
                      .filter((player) => player.player_type === "Defenders")
                      .map((player) => (
                        <div
                          className="player-container"
                          key={player.player_key}
                        >
                          <img
                            src={player.player_image}
                            alt={player.player_name}
                          />
                          <h2>{player.player_name}</h2>
                          <h5>{player.player_age} year old</h5>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="players-section">
                  <h1 className="player-position-title">Midfielders</h1>
                  <div className="players-container">
                    {teamData.players
                      .filter((player) => player.player_type === "Midfielders")
                      .map((player) => (
                        <div
                          className="player-container"
                          key={player.player_key}
                        >
                          <img
                            src={player.player_image}
                            alt={player.player_name}
                          />
                          <h2>{player.player_name}</h2>
                          <h5>{player.player_age} year old</h5>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="players-section">
                  <h1 className="player-position-title">Forwards</h1>
                  <div className="players-container">
                    {teamData.players
                      .filter((player) => player.player_type === "Forwards")
                      .map((player) => (
                        <div
                          className="player-container"
                          key={player.player_key}
                        >
                          <img
                            src={player.player_image}
                            alt={player.player_name}
                          />
                          <h2>{player.player_name}</h2>
                          <h5>{player.player_age} year old</h5>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default TeamInfo;
