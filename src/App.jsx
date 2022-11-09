import React from 'react';
import { useState } from 'react'
import './App.css'

function App() {

  const [teams, setTeams] = useState([])
  const [curTeamVal, setCurTeamVal] = useState("")
  const [matchResults, setMatchResults] = useState([])

  const handleTeamKeyPress = (event) => {
    if (event.key === "Enter") {
      addTeamToList()
    }
  }

  const handleTeamChange = (event) => {
    setCurTeamVal(event.target.value)
  }

  const addTeamToList = () => {
    if (curTeamVal !== "" && !(teams.includes(curTeamVal))) {
      setTeams(current => [...current, curTeamVal])
      setCurTeamVal("")
    }
  }

  const handleTeamClick = (event) => {
    setTeams(teams.filter(e => e !== event.target.innerHTML))
  }

  return (
    <div className="App">
      <input
        type={"text"}
        onKeyDown={handleTeamKeyPress}
        onChange={handleTeamChange}
        value={curTeamVal}
      >

      </input>
      <button
        onClick={addTeamToList}
      >
        Add team
      </button>
      <button
        onClick={() => setTeams([])}
      >
        Clear teams
      </button>
      <br />
      <br />
      <div className='teamsFrame'>
        {teams.map((teamName, index) =>
          <span
            key={"team" + index}
            className={"teamBox"}
            onClick={handleTeamClick}
          >
            {teamName}
          </span>
        )}
      </div>
      <h3>Matches</h3>
      <div className='scoreFrame'>
        {createMachups(teams).map((matchup, index) =>
          <div
            className='matchBox'
            key={"machup" + index}

          >
            <input
              type={"number"}
              placeholder={"Mål"}
              className={"inpLeft"}
            />
            <span className='matchup'>{matchup[0]} - {matchup[1]}</span>
            <input
              type={"number"}
              placeholder={"Mål"}
              className={"inpRight"}
            />
          </div>

        )}
      </div>

    </div>
  )
}

function createMachups(teams) {
  let machups = []
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      machups.push([teams[i], teams[j]])
    }
  }

  return machups
}
export default App
