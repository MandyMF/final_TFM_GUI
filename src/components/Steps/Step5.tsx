import * as React from 'react'

import { Button, Stack, Container, Row, Col, Form, Alert} from 'react-bootstrap'

import SwipeableViews from 'react-swipeable-views';
import FormTextInput from './FormTextInput';

import './Steps.scss'

export enum search_methods {
  all_lemmas,
  first_lemma,
  by_ids,
  by_tag_ids,
  loading_model,
}

interface Step5_params {
  search_method,
  lemma_list, 
  set_lemma_list
  id_list, 
  set_id_list
  tag_list, 
  set_tag_list
  load_model_path, 
  set_load_model_path,

  next_step
}

const Step5 =  (p: Step5_params) => {

  const next_step_l = () => {
    if(p.search_method == search_methods.loading_model)
      window.pywebview.api.check_folder_exits(p.load_model_path).then((exist) => {
        if(exist){
          p.next_step();
          set_no_exist_alert(false);
        }
        else {
          set_no_exist_alert(true);
        }
      });
    else
      p.next_step();
  }

  const [show_alerts, set_show_alerts] = React.useState(false);
  const [no_exist_alert, set_no_exist_alert] = React.useState(false);

  const has_empty = (list) => {

    if (list.length == 0){
      return true;
    }
    for(let item in list){
      if(item.replace(' ','') == ''){
        return true;
      }
    }

    return false;
  }

  const process_entry = (text) => {
    let s_text = text.split(',')

    return s_text
  }

  const not_equal_size = (l1, l2) => {
    if (l1.length != l2.length) {
      return true
    }
    return false
  }

  const get_path_data = () => {
    window.pywebview.api.get_result_folder().then((path) => {
      if(path.trim() != '')
        p.set_load_model_path(path);
      
    });
  }

  const bottom_buttons = (not_show_next) => {
      return  (
      <Container className='bottom'>
      <Stack direction="horizontal" gap={5} className='justify-content-center'>
        { <Button className='nav-button' onClick={() => p.next_step(true)} as="a" variant="primary">
          Anterior
        </Button>}
        {!not_show_next && <Button className='nav-button' onClick={() => next_step_l()} as="a" variant="success">
          Ejecutar
        </Button>
        }
        {not_show_next && <Button className='nav-button' as="a" variant="secondary" style={{opacity: '0.5'}} onClick={() => set_show_alerts(true)}>
          Ejecutar
        </Button>
        }
      </Stack>
    </Container>
    )
  }


  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  
  if (search_methods.all_lemmas == p.search_method){
    return (
    <Container className='view-step-container'>
      <div>
      <Row className='justify-content-center header'>
        <Col xs="auto" md={{offset: 0}}>
          <h1>
            Parámetros para procesar con todos los lemas encontrados
          </h1>
        </Col>
      </Row>

      <Row className='justify-content-start'>
        <Col xs={4} md={{offset: 4}}>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label>Listado de Lemas </Form.Label>
                <Form.Control type='text' placeholder="Lemas separados por comas" 
                  onChange={(e) => {
                    if (e.target.value != '')
                      return p.set_lemma_list(process_entry(e.target.value));
                    else
                     return p.set_lemma_list([]);
                    }}
                  value={p.lemma_list}
                />
                <Form.Text>
                </Form.Text>
              </Form.Group>
              {
                show_alerts && has_empty(p.lemma_list) && <Alert variant="danger">
                Se debe tener al menos un valor
              </Alert>
              }
          </Form>
        </Col>
      </Row>
      </div>
      {bottom_buttons(has_empty(p.lemma_list))}

    </Container>
  )}

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  
    else if (search_methods.first_lemma == p.search_method){
      return (
      <Container className='view-step-container'>
        <div>
        <Row className='justify-content-center header'>
          <Col xs="auto" md={{offset: 0}}>
            <h1>
              Parámetros para procesar por el primer lema encontrado
            </h1>
          </Col>
        </Row>
  
        <Row className='justify-content-start'>
          <Col xs={4} md={{offset: 4}}>
            <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Listado de Lemas</Form.Label>
                  <Form.Control type='text' placeholder="Lemas separados por comas" 
                      onChange={(e) => {
                        if (e.target.value != '')
                          return p.set_lemma_list(process_entry(e.target.value));
                        else
                         return p.set_lemma_list([]);
                        }}
                    value={p.lemma_list}
                  />
                  <Form.Text>
                  </Form.Text>
                </Form.Group>
                {
                    show_alerts && has_empty(p.lemma_list) && <Alert variant="danger">
                    Se debe tener al menos un valor
                  </Alert>
                  }
            </Form>
          </Col>
        </Row>
        </div>
        {bottom_buttons(has_empty(p.lemma_list))}
      </Container>
    )}

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  
    else if (search_methods.by_ids == p.search_method){
      return (
      <Container className='view-step-container'>
        <div>
        <Row className='justify-content-center header'>
          <Col xs="auto" md={{offset: 0}}>
            <h1>
              Parámetros para procesar por identificadores <br/> Synset de BabelNet
            </h1>
          </Col>
        </Row>
  
        <Row className='justify-content-start'>
          <Col xs={4} md={{offset: 4}}>
            <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Listado de identificadores Synset</Form.Label>
                  <Form.Control type='text' placeholder="Identificadores separados por comas" 
                      onChange={(e) => {
                        if (e.target.value != '')
                          return p.set_id_list(process_entry(e.target.value));
                        else
                          return p.set_id_list([]);
                        }}
                    value={p.id_list}
                  />
                  <Form.Text>
                  </Form.Text>
                </Form.Group>
                {
                    show_alerts && has_empty(p.id_list) && <Alert variant="danger">
                    Se debe tener al menos un valor
                  </Alert>
                }
            </Form>
          </Col>
        </Row>
        </div>
        {bottom_buttons(has_empty(p.id_list))}
      </Container>
    )}

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  
      else if (search_methods.by_tag_ids == p.search_method){
        return (
        <Container className='view-step-container'>
          <div>
          <Row className='justify-content-center header'>
            <Col xs="auto" md={{offset: 0}}>
              <h1>
                Parámetros para procesar por identificadores <br/> Synset de BabelNet y marcar con etiquetas
              </h1>
            </Col>
          </Row>
    
          <Row className='justify-content-start'>
            <Col xs={4} md={{offset: 4}}>
              <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Listado de identificadores Synset</Form.Label>
                    <Form.Control type='text' placeholder="Identificadores separados por comas" 
                      onChange={(e) => {
                        if (e.target.value != '')
                          return p.set_id_list(process_entry(e.target.value));
                        else
                          return p.set_id_list([]);
                        }}
                      value={p.id_list}
                    />
                    <Form.Text>
                    </Form.Text>

                  </Form.Group>
                  {
                      show_alerts && has_empty(p.id_list) && <Alert variant="danger">
                      Se debe tener al menos un valor
                    </Alert>
                    }
              </Form>
            </Col>
          </Row>

          <Row className='justify-content-start'>
            <Col xs={4} md={{offset: 4}}>
              <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Listado de Etiquetas</Form.Label>
                    <Form.Control type='text' placeholder="Etiquetas separadas por comas" 
                      onChange={(e) => {
                        if (e.target.value != '')
                          return p.set_tag_list(process_entry(e.target.value));
                        else
                          return p.set_tag_list([]);
                        }}
                      value={p.tag_list}
                    />
                    <Form.Text>
                    </Form.Text>

                  </Form.Group>
                  {
                      show_alerts && ((has_empty(p.tag_list) || not_equal_size(p.id_list, p.tag_list))) && <Alert variant="danger">
                      El número de etiquetas debe ser <br/> igual al número de identificadores de Synset
                    </Alert>
                  }
              </Form>
            </Col>
          </Row>
          </div>
          {bottom_buttons(has_empty(p.id_list) || has_empty(p.tag_list) || not_equal_size(p.id_list, p.tag_list))}

        </Container>
      )}

  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  else if (search_methods.loading_model == p.search_method){
    return (
    <Container className='view-step-container'>
      <div>
      <Row className='justify-content-center header'>
        <Col xs="auto" md={{offset: 0}}>
          <h1>
            Parámetros para procesar cargando y usando un modelo NER
          </h1>
        </Col>
      </Row>

      <Row className='justify-content-start'>
        <Col xs="auto" md={{offset: 4}}>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label>Modelo NER de Spacy a cargar</Form.Label>

                <Row className='justify-content-center'>
                <Col xs="auto" md={{offset: 0}}>
                  <Form.Control type='text'
                    placeholder="Carpeta del modelo"
                    onChange={(e) => p.set_load_model_path(e.target.value)}
                    value={p.load_model_path}
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
                no_exist_alert && <Alert variant="danger">
                  La carpeta introducida no existe
              </Alert>
              }
          </Form>
        </Col>
      </Row>

      </div>
      {bottom_buttons(false)}

    </Container>
  )}
}




export default Step5;