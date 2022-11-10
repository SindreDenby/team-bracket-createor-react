import React from 'react';
import { useState } from 'react'
import './App.css'

function App() {

  const [teams, setTeams] = useState([])
  const [curTeamVal, setCurTeamVal] = useState("")
  const [matchResults, setMatchResults] = useState([])
  const [scoreList, setScoreList] = useState([])

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

  const handleGoalChange = (teamIndex, teamNr, goals) => {
    console.log("Index:" + teamIndex + " Team Side:" + teamNr + " Goals: " + goals);

    let scoreCopy = [...scoreList]

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
      {(teams.length > 0) ? <h4>Teams</h4> : <></>}
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
      {(teams.length > 1) ? <h4>Matches</h4> : <></>}
      <Matchups
        teams={teams}
        handleGoalChange={handleGoalChange}
      />

    </div>
  )
}

const Matchups = (props) => {
  return (
    <div className='scoreFrame'>
      {createMachups(props.teams).map((matchup, index) =>
        <div
          className='matchBox'
          key={"machup" + index}

        >
          <GoalInput inpIndex={[index, 0]} handleGoalChange={props.handleGoalChange} />
          <span className='matchup'>{matchup[0]}</span>
          <span> - </span>
          <span className='matchup'>{matchup[1]}</span>
          <GoalInput inpIndex={[index, 1]} handleGoalChange={props.handleGoalChange} />
        </div>
      )}
    </div>
  )
}

const GoalInput = (props) => {
  return (
    <input
      type={"number"}
      placeholder={"Mål"}
      className={"goalInput"}
      onChange={(event) => {
        props.handleGoalChange(...props.inpIndex, event.target.value)
      }}
    />
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
