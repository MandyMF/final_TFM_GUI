import * as React from 'react'

import { Button, Stack, Container, Row, Col, Form} from 'react-bootstrap'

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

interface Step6_params {
  search_method, 
  set_search_method,

  next_step
}

const Step4 =  (p: Step6_params) => {

  return (
    <Container className='view-step-container'>
      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-center header'>
        <Col xs="auto" md={{offset: 0}}>
          <h1>
            Selección del algoritmo de construcción del modelo NER
          </h1>
        </Col>
      </Row>


      <Row className='justify-content-start'>
        <Col xs="auto" md={{offset: 3}}>
          <Form>
              <Form.Group className="mb-3">
                <Form.Label>Procesar usando:</Form.Label>
                <Form.Check 
                  type='radio'
                  checked={p.search_method == search_methods.all_lemmas} 
                  label = 'Todos los lemas encontrados.'
                  onChange={() =>  p.set_search_method(search_methods.all_lemmas)}></Form.Check>
                <Form.Check 
                  type='radio'
                  checked={p.search_method == search_methods.first_lemma} 
                  label = 'El primer lema encontrado.'
                  onChange={() =>  p.set_search_method(search_methods.first_lemma)}></Form.Check>
                <Form.Check 
                  type='radio'
                  checked={p.search_method == search_methods.by_ids} 
                  label = 'Identificadores Synset de BabelNet.'
                  onChange={() =>  p.set_search_method(search_methods.by_ids)}></Form.Check>
                <Form.Check 
                  type='radio'
                  checked={p.search_method == search_methods.by_tag_ids} 
                  label = 'Identificadores Synset de BabelNet y marcarlos con etiquetas.'
                  onChange={() =>  p.set_search_method(search_methods.by_tag_ids)}></Form.Check>
                <Form.Check 
                  type='radio'
                  checked={p.search_method == search_methods.loading_model} 
                  label = 'Cargando y usando un modelo NER.'
                  onChange={() =>  p.set_search_method(search_methods.loading_model)}></Form.Check>
              </Form.Group>

              {/*Form.Control.Feedback*/}
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


export default Step4;