import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

function ParticipateCard({ title, content, img }) {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <Button variant="outline-dark">Going to participate</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ParticipateCard;
