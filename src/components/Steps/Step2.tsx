import * as React from 'react'

import { Button, Stack, Container, Row, Col, Form, Alert} from 'react-bootstrap'

import SwipeableViews from 'react-swipeable-views';
import FormTextInput from './FormTextInput';

import './Steps.scss'


interface Step2_params {
  result_folder_path;
  set_result_folder_path;

  next_step;
}


const Step2 =  (p: Step2_params) => {

  const [show_alerts, set_show_alerts] = React.useState(false);

  const is_empty = (value: String) => {
    if(value)
      return value.trim() == ''
    else
      return true
  }

  const get_path_data = () => {
    window.pywebview.api.get_result_folder().then((path) => {
      p.set_result_folder_path(path);    
    });
  }


  return (
    <Container className='view-step-container'>
      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-center header'>
        <Col xs="auto" md={{offset: 0}}>
          <h1>
            Ubicación de los Resultados
          </h1>
        </Col>
      </Row>

      <Row className='justify-content-start'>
        <Col xs="auto" md={{offset: 4}}>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label>Carpeta donde guardar los resultados</Form.Label>
                <Row className='justify-content-center'>
                <Col xs="auto" md={{offset: 0}}>
                  <Form.Control type='text'
                    placeholder="Carpeta de resultados"
                    onChange={(e) => p.set_result_folder_path(e.target.value)}
                    value={p.result_folder_path}
                  >
                  </Form.Control>
                  <Form.Text>
                  </Form.Text>
                </Col>
                <Col xs="auto" md={{offset: 0}}>
                  <Button onClick={() => get_path_data()} variant='secondary'> Buscar </Button>
                </Col>
                </Row>
              </Form.Group>
              {
                show_alerts && is_empty(p.result_folder_path) && <Alert variant="danger">
                  Seleccione una carpeta
              </Alert>
              }
          </Form>
        </Col>
      </Row>

      <Container className='bottom'>
        <Stack direction="horizontal" gap={5}>
          { <Button className='nav-button' onClick={() => p.next_step(true)} as="a" variant="primary">
            Anterior
          </Button>}
          {
            !is_empty(p.result_folder_path) &&
            <Button className='nav-button' onClick={() => p.next_step()} as="a" variant="success">
            Siguiente
          </Button>
          }
          {
            is_empty(p.result_folder_path) && <Button className='nav-button' onClick={() => set_show_alerts(true)} variant="secondary" style={{opacity: '0.5'}}>
            Siguiente
            </Button>
          }
        </Stack>
      </Container>


    </Container>
  )
}


export default Step2;