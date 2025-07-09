import { Form, Button, Modal } from "react-bootstrap";

const UpdateCredit = ({ show, onHide, user, formData, onChange, onSave }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          User: {user.name}{" "}
          <small className="text-muted">({user.credits} credits)</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Operation</Form.Label>
            <Form.Select
              name="operation"
              onChange={onChange}
            >
              <option value="">Choose Option</option>
              <option value="add">Add Creadits</option>
              <option value="remove">Deduct Creadits</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Credits</Form.Label>
            <Form.Control type="number" name="credits" onChange={onChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCredit;
