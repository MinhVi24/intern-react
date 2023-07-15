import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { postCreateUser } from "../services/UserService";
import {  toast } from 'react-toastify';


const ModalAddNew = (props) => {
  const { show, handleClose , handleUpdateTable} = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  // lưu một đối tượng 
  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      handleClose()
      // resert form 
      setName('');
      setJob('');
      toast.success(" Add new success")
      handleUpdateTable({first_name: name , id: res.id});
      //Success
    } else {
      toast.success("Thêm Thất Baị")
      //error
    }
  };

  return (
    <>
      <Modal
       show={show} 
       onHide={handleClose}
       backdrop="static" 
       keyboard={false} 
       >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Job"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
