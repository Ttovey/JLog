import BarChart from "../components/Chart";
import {useEffect, useState} from 'react'
import JLogAPI from "../api/JLogAPI";
import {Dropdown} from 'react-bootstrap'

function DashBoard(props) {
  
  const [jiuJitsu, setJiuJitsu] = useState(null)
  const [jiuJitsuData, setJiuJitsuData] = useState(null)
  const [timeRange, setTimeRange] = useState('All Time')

  useEffect(() => {
    loadJiuJitsu()
  }, [])

  const loadJiuJitsu = async () => {
    const data = await JLogAPI.getJiuJitsu()
    if (data) {
      setJiuJitsu(data)
      setJiuJitsuData(data)
    }
  }

  const addDate = (evt) => {
    let timeDict = {'Week': 604800000, 'Month': 2629800000,'3 Months': 7889400000, 'Year': 31557600000}

    let selectedTimeRange = evt.target.text
    if (timeRange === selectedTimeRange) {
      return
    }
    setTimeRange(selectedTimeRange)
    if (selectedTimeRange === 'All Time') {
      setJiuJitsuData(jiuJitsu)
      return
    }

    let today = new Date()
    today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    today = new Date(today)

    const jitzDataByDate = jiuJitsu.filter((jitz) => {
      let jitzDate = new Date(jitz.date.slice(0, 10))
      let dateDiff = Math.abs(today - jitzDate)
      return dateDiff < timeDict[evt.target.text]
    })

    console.log(jitzDataByDate)
    setJiuJitsuData(jitzDataByDate)

  }

  let jiuJitsuStats = null
  const getJitzStats = () => {
    let totalTime = 0;
    let totalRolls = 0;
    let totalSessions = 0;
    if (jiuJitsu) {
      for (let i = 0; i < jiuJitsuData.length; i++) {
        totalTime += jiuJitsuData[i].duration
        totalRolls += jiuJitsuData[i].rolls
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
          <Dropdown.Item onClick={addDate}>All Time</Dropdown.Item>
          <Dropdown.Item onClick={addDate}>Week</Dropdown.Item>
          <Dropdown.Item onClick={addDate}>Month</Dropdown.Item>
          <Dropdown.Item onClick={addDate}>3 Months</Dropdown.Item>
          <Dropdown.Item onClick={addDate}>Year</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <p>Time Range: {timeRange}</p>

      <BarChart jiuJitsu={jiuJitsuData}/>
      <div className="stats mt-1">
        <h3 className="mt-2"><strong>Jiu Jitsu Stats</strong></h3>
        <hr className="line"/>
        <div className="display-stats">
          <p>Total Rolls: {jiuJitsuStats.totalRolls}</p>
          <p>Total Time: {jiuJitsuStats.totalTime} minutes</p>
          <p>Total Sessions: {jiuJitsuStats.totalSessions}</p>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;