import {useState} from 'react'
import {Dropdown} from 'react-bootstrap'
import JiuJitsuDash from "../components/DashBoard/JiuJitsuDash";
import StrengthDash from '../components/DashBoard/StrengthDash';

function DashBoard(props) {
  
  const [displayData, setDisplayData] = useState('Jiu Jitsu')

  const changeData = (evt) => {
    const newDisplayData = evt.target.text
    setDisplayData(newDisplayData)
  }

  const renderData = () => {
    if (displayData === 'Jiu Jitsu') {
      return <JiuJitsuDash />
    } else if (displayData === 'Strength Training') {
      return <StrengthDash />
    }
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className='mt-1' size='sm' variant="secondary" id="dropdown-basic">
          Display Data
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={changeData}>Jiu Jitsu</Dropdown.Item>
          <Dropdown.Item onClick={changeData}>Strength Training</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <p>Display Data: {displayData}</p>

      { renderData() }

    </div>
  )
}

export default DashBoard;