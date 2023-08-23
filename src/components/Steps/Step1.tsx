import * as React from 'react'

import { Button, Stack, Container, Row, Col, Form, Alert} from 'react-bootstrap'

import SwipeableViews from 'react-swipeable-views';
import FormTextInput from './FormTextInput';

import './Steps.scss'


interface Step1_params {
  babel_key;
  set_babel_key;
  lang;
  set_lang;
  data_to_process_path;
  set_data_to_process_path;

  next_step;
}


const Step1 =  (p: Step1_params) => {

  const [show_alerts, set_show_alerts] = React.useState(false);

  const get_path_data = () => {
    window.pywebview.api.get_data_file().then((path) => {
      p.set_data_to_process_path(path);
    });
  }

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
            Inicialización de variables Básicas
          </h1>
        </Col>
      </Row>

      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-start'>
        <Col xs={3} md={{offset: 4}}>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label>Llave BabelNet</Form.Label>
                <Form.Control type='text' placeholder="Valor de la llave BabelNet" 
                  onChange={(e) => p.set_babel_key(e.target.value)}
                  value={p.babel_key}
                />
                <Form.Text>
                </Form.Text>
              </Form.Group>
              {
                show_alerts && is_empty(p.babel_key) && <Alert variant="danger">
                  El campo debe tener valor
              </Alert>
              }
          </Form>
        </Col>
      </Row>

      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-start'>
        <Col xs="auto" md={{offset: 4}}>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label>Idioma de Procesamiento</Form.Label>
                <Form.Control as="select" type='text'
                  onChange={(e) => p.set_lang(e.target.value)}
                  value={p.lang}
                >
                  <option value="EN"> Inglés </option>
                  <option value="ES"> Español </option>
                </Form.Control>
              </Form.Group>
          </Form>
        </Col>
      </Row>

      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-start'>
        <Col xs="auto" md={{offset: 4}}>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label>Archivo de datos a procesar</Form.Label>

                <Row className='justify-content-center'>
                <Col xs="auto" md={{offset: 0}}>
                  <Form.Control type='text'
                    placeholder="Archivo a procesar"
                    onChange={(e) => p.set_data_to_process_path(e.target.value)}
                    value={p.data_to_process_path}
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
                show_alerts && is_empty(p.data_to_process_path) && <Alert variant="danger">
                  Seleccione un archivo
              </Alert>
              }
          </Form>
        </Col>
      </Row>

      <Container className='bottom'>
        <Stack direction="horizontal" gap={5}>
          {   
          <Button className='nav-button' onClick={() => p.next_step(true)} as="a" variant="primary">
            Anterior
          </Button>
          }

          {
            (!is_empty(p.babel_key) && !is_empty(p.data_to_process_path)) && <Button className='nav-button' onClick={() => p.next_step()} as="a" variant="success">
            Siguiente
          </Button>
          }

          {
            !(!is_empty(p.babel_key) && !is_empty(p.data_to_process_path)) && <Button className='nav-button' onClick={() => set_show_alerts(true)} variant="secondary" style={{opacity: '0.5'}}>
            Siguiente
          </Button>
          }
        </Stack>
      </Container>
    </Container>
  )
}


export default Step1;