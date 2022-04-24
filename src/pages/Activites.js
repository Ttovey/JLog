import AddActivityModal from "../components/AddActivityModal";
import { useEffect, useState } from "react";
import JLogAPI from "../api/JLogAPI";
import { Accordion, Button, ListGroup } from "react-bootstrap";


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
                <Accordion.Body className="text-left">
                  <ListGroup>
                    <ListGroup.Item>Description: {jitz.description}</ListGroup.Item>
                    <ListGroup.Item>Duration: {jitz.duration} minutes</ListGroup.Item>
                    <ListGroup.Item>Rolls: {jitz.rolls}</ListGroup.Item>
                    <ListGroup.Item>Submissions: <ul>{jitz.submissions.map((sub, index) => {
                    return <li>{sub.name} : {sub.count}</li>})}</ul></ListGroup.Item>
                  </ListGroup>
                  <Button variant='danger' className="ml-auto" onClick={() => handleDelete(jitz.id)}>Delete</Button>
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