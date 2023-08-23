import * as React from 'react'

import { Button, Stack, Container, Row, Col, Form} from 'react-bootstrap'

import SwipeableViews from 'react-swipeable-views';
import FormTextInput from './FormTextInput';

import './Steps.scss'


interface Step3_params {
  search_levels;
  set_search_levels;
  match_levenshtein_distance;
  set_match_levenshtein_distance;
  dataset_is_lemmatized;
  set_dataset_is_lemmatized;

  next_step;
}


const Step3 =  (p: Step3_params) => {

  const [show_alerts, set_show_alerts] = React.useState(false);

  const is_empty = (value: String) => {
    if(value)
      return value.trim() == ''
    else
      return true
  }

  return (
    <Container className='view-step-container'>
      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-center header'>
        <Col xs="auto" md={{offset: 0}}>
          <h1>
            Inicialización de variables de búsqueda
          </h1>
        </Col>
      </Row>

      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-start'>
        <Col xs="auto" md={{offset: 4}}>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nivel de profundidad de búsqueda</Form.Label>
                <Form.Control type='number' 
                  onChange={(e) => p.set_search_levels(e.target.value)}
                  value={p.search_levels}
                />
                <Form.Text>
                </Form.Text>
              </Form.Group>
          </Form>
        </Col>
      </Row>

      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-start'>
        <Col xs="auto" md={{offset: 4}}>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label>Distancia de similaridad de Levenshtein </Form.Label>
                <Form.Control type='number'
                  onChange={(e) => p.set_match_levenshtein_distance(e.target.value)}
                  value={p.match_levenshtein_distance}
                />
                <Form.Text>
                </Form.Text>
              </Form.Group>
          </Form>
        </Col>
      </Row>

      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-start switch-inline'>
        <Col xs="auto" md={{offset: 4}}>
          <Form>
              <Form.Group className="mb-3">
              <Row>
                <Col xs="auto">
                <Form.Label> Asumir que el dataset está lemmatizado </Form.Label>
                </Col>
                <Col xs="auto">
                <Form.Check className='switch-check-box' type='switch'
                  onChange={(e) => p.set_dataset_is_lemmatized(!p.dataset_is_lemmatized)}
                  checked={p.dataset_is_lemmatized}
                />
                </Col>
              </Row>
              </Form.Group>
          </Form>
        </Col>
      </Row>

      
      <Container className='bottom'>
        <Stack direction="horizontal" gap={5}>
          { <Button className='nav-button' onClick={() => p.next_step(true)} as="a" variant="primary">
            Anterior
          </Button>}
          {<Button className='nav-button' onClick={() => p.next_step()} as="a" variant="success">
            Siguiente
          </Button>
          }
        </Stack>
      </Container>

    </Container>
  )
}


export default Step3;