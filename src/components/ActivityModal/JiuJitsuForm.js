import JLogAPI from "../../api/JLogAPI";
import { Button, Form } from "react-bootstrap";
import { useState } from 'react';

function JiuJitsuForm (props) {

  const [submissionGroups, setSubmissionGroups] = useState(0)

  const addSubmissionInput = () => {
    const newSubmissionGroups = submissionGroups + 1
    setSubmissionGroups(newSubmissionGroups)
  }

  const handleClose = () => {
    console.log('closing Modal')
    props.setShow(false)
    props.setActivity('')
    setSubmissionGroups(0)
  }

  const renderSubmissionGroups = () => {
    const elements = []
    for (let i = 0; i < submissionGroups; i++) {
      elements.push(<Form.Group className="mb-3">
      <Form.Label>Submission {i+1}</Form.Label>
      <Form.Control type='text' placeholder='submission name' name={`sub-name-${i}`}/>
      <br />
      <Form.Control type="number" name={`sub-number-${i}`}/>
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

    const subs = []
    if (props.activity === 'Jiu Jitsu') {
      activityData.rolls = evt.target.elements['rolls'].value
      activityData.submissions = []
      if (submissionGroups) {
        for (let i = 0; i < submissionGroups; i++) {
          const curSub = {}
          curSub.name = evt.target.elements[`sub-name-${i}`].value
          curSub.count = evt.target.elements[`sub-number-${i}`].value
          subs.push(curSub)
        }
      }
    }
    const data = await JLogAPI.createJiuJitsu(activityData)
    if (data) {
      // if creation success, add submissions now that we have data id
      if (submissionGroups) {
        const sub_data = await Promise.all(subs.map((sub, index) => {
          sub.jiu_jitsu_id = data.id
          return JLogAPI.createSubmission(sub)
        }))
        data.submissions = sub_data
      }

      const newJiuJitsu = [data, ...props.jiuJitsu]
      props.setJiuJitsu(newJiuJitsu)
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
          <Form.Group className="mb-3">
            <Form.Label>Rolls</Form.Label>
            <Form.Control name='rolls' type="number"/>
          </Form.Group>
          <Button variant="primary" className='mb-1' onClick={addSubmissionInput}>
            Add Submission
          </Button>
          { renderSubmissionGroups() }
          <br />
          <Button variant="primary" type="submit" className='mb-1'>
            Add Activity
          </Button>
      </Form>
  )
}

export default JiuJitsuForm;