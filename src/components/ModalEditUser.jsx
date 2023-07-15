import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { putUpdateUser } from "../services/UserService";
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");


  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if (res && res.updatedAt) {
      //success
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id
      })

    }
    handleClose();
    toast.success("Cập Nhật Thành Công !")

  }
  // load dữ liệu lên lại from
  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name)
    }
  }, [show, dataUserEdit])



  return (
    <>
      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}

      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
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
          <Button variant="primary" onClick={() => handleEditUser()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
