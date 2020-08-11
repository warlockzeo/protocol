import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const AccordionCard = ({ accordionKey, title, className, data }) => {
  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={accordionKey}
        className={className}
      >
        {title}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={accordionKey}>
        <Card.Body>{data}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default AccordionCard;
