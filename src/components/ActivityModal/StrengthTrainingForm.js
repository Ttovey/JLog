import JLogAPI from "../../api/JLogAPI";
import { Button, Form } from "react-bootstrap";
import { useState } from 'react';

function StrengthTrainingForm (props) {

  const [sets, setSets] = useState(0)

  const addSetInput = () => {
    const newSet = sets + 1
    setSets(newSet)
  }

  const handleClose = () => {
    console.log('closing Modal')
    props.setShow(false)
    props.setActivity('')
    setSets(0)
  }

  const renderSetGroups = () => {
    const elements = []
    for (let i = 0; i < sets; i++) {
      elements.push(<Form.Group className="mb-3">
      <Form.Label>Set {i+1}</Form.Label>
      <Form.Control type='text' placeholder='set name' name={`set-name-${i}`}/>
      <br />
      <Form.Label>Number of Sets</Form.Label>
      <Form.Control type="number" name={`set-number-${i}`}/>
      <Form.Label>Number of Reps</Form.Label>
      <Form.Control type="number" name={`set-reps-${i}`}/>
      <Form.Label>Weight</Form.Label>
      <Form.Control type="number" name={`set-weight-${i}`}/>
      </Form.Group>)
    }
    return elements
  }

  const handleFormSubmissions = async (evt) => {
    evt.preventDefault()
    console.log(evt)

    const activityData = {}

    activityData.name = evt.target.elements['name'].value
    activityData.user_id = localStorage.getItem('userId')
    activityData.description = evt.target.elements['description'].value
    activityData.duration = evt.target.elements['duration'].value

    const setArr = []
    if (props.activity === 'Strength Training') {
      activityData.sets = []
      if (sets) {
        for (let i = 0; i < sets; i++) {
          const curSet = {}
          curSet.name = evt.target.elements[`set-name-${i}`].value
          curSet.count = evt.target.elements[`set-number-${i}`].value
          curSet.reps = evt.target.elements[`set-reps-${i}`].value
          curSet.weight = evt.target.elements[`set-weight-${i}`].value
          setArr.push(curSet)
        }
      }
    }
    const data = await JLogAPI.createStrengthTraining(activityData)
    if (data) {
      // if creation success, add submissions now that we have data id
      if (sets) {
        const set_data = await Promise.all(setArr.map((set, index) => {
          set.strength_id = data.id
          return JLogAPI.createSet(set)
        }))
        data.sets = set_data
      }

      const newStrengthTraining = [data, ...props.strengthTraining]
      props.setStrengthTraining(newStrengthTraining)
      handleClose()
    }
  }

  return (
      <Form onSubmit={handleFormSubmissions} className='px-3'>
           <hr />
          <Form.Group className="mb-3">
            <Form.Label>Activity Name</Form.Label>
            <Form.Control name='name' type="text" placeholder="enter name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control name='description' placeholder="description" as='textarea'/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Form.Control name='duration' type="number"/>
          </Form.Group>
          <Button variant="primary" className='mb-1' onClick={addSetInput}>
            Add Set
          </Button>
          { renderSetGroups() }
          <br />
          <Button variant="primary" type="submit" className='mb-1'>
            Add Activity
          </Button>
      </Form>
  )
}

export default StrengthTrainingForm;