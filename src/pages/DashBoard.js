import BarChart from "../components/Chart";
import {useEffect, useState} from 'react'
import JLogAPI from "../api/JLogAPI";
import {Dropdown} from 'react-bootstrap'

function DashBoard(props) {
  
  const [jiuJitsu, setJiuJitsu] = useState(null)
  // const [jiuJitsuStats, setJiuJitsuStats] = useState({})

  useEffect(() => {
    loadJiuJitsu()
  }, [])

  const loadJiuJitsu = async () => {
    const data = await JLogAPI.getJiuJitsu()
    if (data) {
      setJiuJitsu(data)
    }
  }

  const addQuery = (evt) => {
    console.log(evt.target.text)
    let today = new Date()
    today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    today = new Date(today)
    jiuJitsu.forEach((jitz) => {
      let jitzDate = new Date(jitz.date.slice(0, 10))
      let dateDiff = Math.abs(today - jitzDate)
      if (dateDiff < 604800000) {
        console.log('This happened less than a week ago')
      } else if (dateDiff < 2629800000 ) {
        console.log('This happened less than a month ago')
      } else if (dateDiff < 7889400000) {
        console.log('This happened less than 3 months ago')
      } else if (dateDiff < 31557600000) {
        console.log('This happened less than a year ago')
      } else {
        console.log('This was a long time ago')
      }
    })
  }

  let jiuJitsuStats = null
  const getJitzStats = () => {
    let totalTime = 0;
    let totalRolls = 0;
    let totalSessions = 0;
    if (jiuJitsu) {
      for (let i = 0; i < jiuJitsu.length; i++) {
        totalTime += jiuJitsu[i].duration
        totalRolls += jiuJitsu[i].rolls
        totalSessions += 1
      }
    }
    let newJiuJitsuStats = {}
    newJiuJitsuStats.totalTime = totalTime
    newJiuJitsuStats.totalRolls = totalRolls
    newJiuJitsuStats.totalSessions = totalSessions
    jiuJitsuStats = newJiuJitsuStats
  }

  getJitzStats()

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className='mt-1' size='sm' variant="secondary" id="dropdown-basic">
          Select Time Range
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={addQuery}>All Time</Dropdown.Item>
          <Dropdown.Item onClick={addQuery}>Week</Dropdown.Item>
          <Dropdown.Item onClick={addQuery}>Month</Dropdown.Item>
          <Dropdown.Item onClick={addQuery}>3 Months</Dropdown.Item>
          <Dropdown.Item onClick={addQuery}>Year</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <BarChart jiuJitsu={jiuJitsu}/>
      <div className="stats mt-1">
        <h3 className="mt-2"><strong>Jiu Jitsu Stats</strong></h3>
        <hr className="line"/>
        <div className="display-stats">
          <p>Total Rolls: {jiuJitsuStats.totalRolls}</p>
          <p>Total Time: {jiuJitsuStats.totalTime}</p>
          <p>Total Sessions: {jiuJitsuStats.totalSessions}</p>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;