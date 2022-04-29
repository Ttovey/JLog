import AddActivityModal from "../components/ActivityModal/AddActivityModal";
import Paginate from "../components/Paginate";
import { useEffect, useState } from "react";
import JLogAPI from "../api/JLogAPI";
import { Accordion, Button, ListGroup } from "react-bootstrap";


function Activities() {

  const [jiuJitsu, setJiuJitsu] = useState([])
  const [strengthTraining, setStrengthTraining] = useState([])
  const [allActivities, setAllActivities] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [activitiesPerPage, setActivitiesPerPage] = useState(7)

  useEffect(() => {
    loadJiuJitsu()
    loadStrengthTraining()
  }, [])

  useEffect(() => {
    addActivities()
  }, [jiuJitsu, strengthTraining])

  const loadJiuJitsu = async () => {
    const data = await JLogAPI.getJiuJitsu()
    if (data) {
      setJiuJitsu(data)
    }
  }

  const loadStrengthTraining = async () => {
    const data = await JLogAPI.getStrengthTraining()
    if (data) {
      setStrengthTraining(data)
    }
  }

  const addActivities = () => {
    const newActivities = [...jiuJitsu, ...strengthTraining]
    newActivities.sort((a, b) => new Date(b.date) - new Date(a.date))
    console.log(newActivities)
    setAllActivities(newActivities)
  }

  const handleDelete = async (id) => {
    const res = await JLogAPI.deleteJiuJitsu(id)
    if (res) {
      loadJiuJitsu()
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const renderActivities = (data) => {
    if (allActivities !== []) {
      return data.map((activity, index) => {
        if ('submissions' in activity) {
          return <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header><em>Jiu Jitsu </em> : {activity.name} - {activity.date.slice(0, 10)}</Accordion.Header>
                <Accordion.Body className="text-left">
                  <ListGroup>
                    <ListGroup.Item>Description: {activity.description}</ListGroup.Item>
                    <ListGroup.Item>Duration: {activity.duration} minutes</ListGroup.Item>
                    <ListGroup.Item>Rolls: {activity.rolls}</ListGroup.Item>
                    <ListGroup.Item>Submissions: <ul>{activity.submissions.map((sub, index) => {
                    return <li>{sub.name} : {sub.count}</li>})}</ul></ListGroup.Item>
                  </ListGroup>
                  <Button variant='danger' className="ml-auto" onClick={() => handleDelete(activity.id)}>Delete</Button>
                </Accordion.Body>
              </Accordion.Item>
        } else {
          return <Accordion.Item eventKey={`${index}`}>
          <Accordion.Header><em>Strength Training </em> : {activity.name} - {activity.date.slice(0, 10)}</Accordion.Header>
          <Accordion.Body className="text-left">
            <ListGroup>
              <ListGroup.Item>Description: {activity.description}</ListGroup.Item>
              <ListGroup.Item>Duration: {activity.duration} minutes</ListGroup.Item>
              <ListGroup.Item>Sets: <ul>{activity.sets.map((set, index) => {
              return <li>{set.name} : {set.count}x{set.reps} - {set.weight}lbs</li>})}</ul></ListGroup.Item>
            </ListGroup>
            <Button variant='danger' className="ml-auto" onClick={() => handleDelete(activity.id)}>Delete</Button>
          </Accordion.Body>
        </Accordion.Item>
        }
      })
    }
  }

  const indexOfLastActivity = currentPage * activitiesPerPage
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage
  const currentActivities = allActivities.slice(indexOfFirstActivity, indexOfLastActivity)

  return (
    <div>
     <AddActivityModal jiuJitsu={jiuJitsu} setJiuJitsu={setJiuJitsu} strengthTraining={strengthTraining} setStrengthTraining={setStrengthTraining}/>
     <hr />
     <div className="activity-section">
     <Accordion>
     { renderActivities(currentActivities) }
     </Accordion>
     { allActivities.length > 0 && <Paginate activitiesPerPage={activitiesPerPage} totalActivities={allActivities.length} paginate={paginate}/>}
     </div>
    </div>
  )
}

export default Activities;