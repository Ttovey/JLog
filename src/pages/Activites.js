import AddActivityModal from "../components/ActivityModal/AddActivityModal";
import Paginate from "../components/Paginate";
import { useEffect, useState } from "react";
import JLogAPI from "../api/JLogAPI";
import { Accordion, Button, ListGroup } from "react-bootstrap";


function Activities() {

  const [jiuJitsu, setJiuJitsu] = useState([])
  const [strengthTraining, setStrengthTraining] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [activitiesPerPage, setActivitiesPerPage] = useState(7)

  useEffect(() => {
    loadJiuJitsu()
  }, [])

  const loadJiuJitsu = async () => {
    const data = await JLogAPI.getJiuJitsu()
    if (data) {
      setJiuJitsu(data)
    }
  }

  const handleDelete = async (id) => {
    const res = await JLogAPI.deleteJiuJitsu(id)
    if (res) {
      loadJiuJitsu()
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const renderJiuJitsu = (data) => {
    if (jiuJitsu !== []) {
      return data.map((jitz, index) => {
        return <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header><em>Jiu Jitsu </em> : {jitz.name} - {jitz.date.slice(0, 10)}</Accordion.Header>
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

  const indexOfLastActivity = currentPage * activitiesPerPage
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage
  const currentActivities = jiuJitsu.slice(indexOfFirstActivity, indexOfLastActivity)

  return (
    <div>
     <AddActivityModal jiuJitsu={jiuJitsu} setJiuJitsu={setJiuJitsu} strengthTraining={strengthTraining} setStrengthTraining={setStrengthTraining}/>
     <hr />
     <div className="activity-section">
     <Accordion>
     { renderJiuJitsu(currentActivities) }
     </Accordion>
     { jiuJitsu.length > 0 && <Paginate activitiesPerPage={activitiesPerPage} totalActivities={jiuJitsu.length} paginate={paginate}/>}
     </div>
    </div>
  )
}

export default Activities;