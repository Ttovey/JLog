import AddActivityModal from "../components/AddActivityModal";
import { useEffect, useState } from "react";
import JLogAPI from "../api/JLogAPI";
import { Accordion, Button } from "react-bootstrap";


function Activities() {

  const [jiuJitsu, setJiuJitsu] = useState([])

  useEffect(() => {
    loadJiuJitsu()
  }, [])

  const loadJiuJitsu = async () => {
    const data = await JLogAPI.getJiuJitsu()
    if (data) {
      console.log(data)
      setJiuJitsu(data)
    }
  }

  const handleDelete = async (id) => {
    const res = await JLogAPI.deleteJiuJitsu(id)
    if (res) {
      loadJiuJitsu()
    }
  }

  const renderJiuJitsu = () => {
    if (jiuJitsu !== []) {
      return jiuJitsu.map((jitz, index) => {
        console.log(jitz)
        return <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header>{jitz.name} : {jitz.date.slice(0, 10)}</Accordion.Header>
                <Accordion.Body>
                  <p>{jitz.description}</p>
                  <p>Duration: {jitz.duration} minutes</p>
                  <p>Rolls: {jitz.rolls}</p>
                  <ul>Submissions:{jitz.submissions.map((sub, index) => {
                    return <li>{sub.name} : {sub.count}</li>
                  })}</ul>
                  <hr />
                  <Button variant='danger' onClick={() => handleDelete(jitz.id)}>Delete</Button>
                </Accordion.Body>
              </Accordion.Item>
      })
    }
  }

  return (
    <div>
     <AddActivityModal jiuJitsu={jiuJitsu} setJiuJitsu={setJiuJitsu}/>
     <hr />
     <div className="activity-section">
     <Accordion>
     { renderJiuJitsu() }
     </Accordion>
     </div>
    </div>
  )
}

export default Activities;