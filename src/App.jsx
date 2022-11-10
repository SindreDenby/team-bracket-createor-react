import React from 'react';
import { useState } from 'react'
import './App.css'

function App() {

  const [teams, setTeams] = useState([])
  const [curTeamVal, setCurTeamVal] = useState("")
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
        scoreList={scoreList}
        setScoreList={setScoreList}
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
          <GoalInput
            inpIndex={[index, 0]}
            scoreList={props.scoreList}
            setScoreList={props.setScoreList}
          />
          <span className='matchup'>{matchup[0]}</span>
          <span> - </span>
          <span className='matchup'>{matchup[1]}</span>
          <GoalInput
            inpIndex={[index, 1]}
            scoreList={props.scoreList}
            setScoreList={props.setScoreList}
          />
        </div>
      )}
    </div>
  )
}

const GoalInput = (props) => {
  const updateGoalCount = (event) => {
    let scoreCopy = [...props.scoreList]


  }

  return (
    <input
      type={"number"}
      placeholder={"Mål"}
      className={"goalInput"}
      onChange={updateGoalCount}
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
