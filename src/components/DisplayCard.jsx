import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { formatRelative } from 'date-fns';

function DisplayCard(props) {

  return (
    <Modal
      {...props}
      size="xxl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            <span>Expense: ₹</span>
          {props.details?.amount}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex flex-row justify-content-between'>
            <h4>Title: <span style={{fontWeight:'normal'}}>{props.details.title}</span></h4>
            <h4>Date: <span style={{fontWeight:'normal'}}>{props.details.date?.slice(0,10)}</span></h4>
        </div>
        <p style={{overflow:'hidden'}}>
          <h4>Description</h4>
          {props.details.description}
        </p>
        <h4>Categories</h4>
        <div className='d-flex flex-wrap gap-3'>
            {props.details.categories?.map((cat)=>{
                return <Badge key={cat._id}>{cat.title}</Badge>
            })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DisplayCard;