import * as React from 'react'

import { Button, Stack, Container, Row, Col, Form} from 'react-bootstrap'

import SwipeableViews from 'react-swipeable-views';

import './Steps.scss'

interface TextInput {
  label,
  valueType,
  placeholder,
  disabled?,
  valueId,
  value?
}


const FormTextInput =  (props: TextInput) => {
  
  const [slide, setSlide] = React.useState(0);

  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control name={props.valueId} type={props.valueType} placeholder={props.placeholder} disabled={props.disabled} />
      <Form.Text className="text-muted">
        {/*props.value*/}
      </Form.Text>
    </Form.Group>
  )
}


export default FormTextInput;