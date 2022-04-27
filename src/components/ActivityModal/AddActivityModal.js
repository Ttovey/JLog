import { useState } from "react";
import { Modal, Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import JLogAPI from "../../api/JLogAPI";
import JiuJitsuForm from "./JiuJitsuForm";

function AddActivityModal(props) {

  const [show, setShow] = useState(false);
  const [activity, setActivity] = useState('')
  

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setActivity('')
    setShow(false)
  }
  const handleSelectActivity = (evt) => {
    const newActivity = evt.target.text
    setActivity(newActivity)
  }

  const renderActivityForms = (evt) => {
    if (activity === 'Jiu Jitsu') {
      return (
        <JiuJitsuForm jiuJitsu={props.jiuJitsu} setJiuJitsu={props.setJiuJitsu} activity={activity} setActivity={setActivity} setShow={setShow}/>
      )
    }
  }

  return (
    <>

      <Button variant='secondary' className="mt-2" onClick={handleShow}>Add Activity</Button>

      <Modal show={show} onHide={handleClose} className='text-center'>
        <Modal.Header closeButton>
          <Modal.Title>Add a Activity</Modal.Title>
        </Modal.Header>
        <DropdownButton id="dropdown-basic-button" title="Select Activity" className='mt-1 mb-1 ml-1'>
          <Dropdown.Item onClick={handleSelectActivity}>Jiu Jitsu</Dropdown.Item>
          <Dropdown.Item onClick={handleSelectActivity}>Strength Training</Dropdown.Item>
          <Dropdown.Item onClick={handleSelectActivity}>Cardio</Dropdown.Item>
          <Dropdown.Item onClick={handleSelectActivity}>Recovery</Dropdown.Item>
        </DropdownButton>
        { renderActivityForms() }
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddActivityModal;