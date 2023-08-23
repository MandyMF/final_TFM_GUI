import * as React from 'react'

import { Button, Stack, Container, Row, Col, Form, Alert, Image} from 'react-bootstrap'

import SwipeableViews from 'react-swipeable-views';
import FormTextInput from './FormTextInput';

import './Steps.scss'

import logo_banner from "../../assets/logos_banner.png"

const styles = {
  banner: {
    width: '100%',
  },
  centerText: {
    textAlign: "center"
  }
}



interface Step0_params {
  next_step;
}


const Step0 =  (p: Step0_params) => {

  return (
    <Container className='view-step-container'>
      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-center header'>
        <Col xs="auto" md={{offset: 0}}>
          <h1>
            Bienvenido a BabelMatcher
          </h1>
        </Col>
      </Row>

      {/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <Row className='justify-content-center'>
        <Col xs="auto" md={{offset: 0}}>
          <Image style={styles.banner} src={logo_banner} rounded></Image>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={11} md={{offset: 0}} style={styles.centerText}>
          <h5><b>Esta aplicación permite configurar y ejecutar un modelo NER para la identificación de signos no radiológicos en reportes médicos.</b></h5>
        </Col>
      </Row>

      <Container className='bottom'>
        <Stack direction="horizontal" className='justify-content-center'>
          {
            <Button className='nav-button' onClick={() => p.next_step()} as="a" variant="success">
            Comenzar
            </Button>
          }
        </Stack>
      </Container>
    </Container>
  )
}


export default Step0;