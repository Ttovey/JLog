import {useEffect, useState} from 'react'
import { Dropdown } from "react-bootstrap"
import JLogAPI from "../../api/JLogAPI"
import LineChart from './LineChart'

function StrengthDash() {
  const [timeRange, setTimeRange] = useState('All Time')
  const [strengthTraining, setStrengthTraining] = useState(null)
  const [strengthTrainingData, setStrengthTrainingData] = useState(null)
  const [workout, setWorkOut] = useState(null)

  useEffect(() => {
    loadStrengthTraining()
  }, [])

  const loadStrengthTraining = async () => {
    const data = await JLogAPI.getStrengthTraining()
    if (data) {
      setStrengthTraining(data)
      setStrengthTrainingData(data)
    }
  }

  const renderWorkoutDropdown = () => {
    const workouts = []
    strengthTrainingData.forEach((data) => {
      data.sets.forEach((set) => {
        if (!workouts.includes(set.name)) {
          workouts.push(set.name)
        }
      })
    })
    const dropdownItems = []
    workouts.forEach((workout) => {
      dropdownItems.push(<Dropdown.Item onClick={changeWorkout}>{workout}</Dropdown.Item>)
    })
    console.log(dropdownItems)
    return dropdownItems
    
  }

  const addDate = () => {

  }

  const changeWorkout = (evt) => {
    console.log(evt.target.text)
    setWorkOut(evt.target.text)
  }


  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className='mt-1' size='sm' variant="secondary" id="dropdown-basic">
          Select Time Range
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={addDate}>All Time</Dropdown.Item>
          <Dropdown.Item onClick={addDate}>Week</Dropdown.Item>
          <Dropdown.Item onClick={addDate}>Month</Dropdown.Item>
          <Dropdown.Item onClick={addDate}>3 Months</Dropdown.Item>
          <Dropdown.Item onClick={addDate}>Year</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <p>Time Range: {timeRange}</p>

      <Dropdown>
        <Dropdown.Toggle className='mt-1' size='sm' variant="secondary" id="dropdown-basic">
          Select Workout
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {strengthTrainingData && renderWorkoutDropdown()}
        </Dropdown.Menu>
      </Dropdown>

      {strengthTrainingData && <LineChart data={strengthTrainingData} workout={workout}/>}
      {/* <div className="stats mt-1">
      <h3 className="mt-2"><strong>Strength Training Stats</strong></h3>
      <hr className="line"/>
      <div className="display-stats">
        <p>Total Time: {} minutes</p>
        <p>Total Sessions: {}</p>
        <p>Total Weight: {}</p>
      </div>
    </div> */}
    </div>
  )
}

export default StrengthDash;