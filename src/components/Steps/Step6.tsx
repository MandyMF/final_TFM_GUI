import * as React from 'react'

import { Button, Stack, Container, Row, Col, Form, Spinner, Image } from 'react-bootstrap'

import SwipeableViews from 'react-swipeable-views';
import FormTextInput from './FormTextInput';
import * as Icon from 'react-bootstrap-icons';

import './Steps.scss'
import hourglass from '../../assets/hourglass.gif'

export enum search_methods {
  all_lemmas,
  first_lemma,
  by_ids,
  by_tag_ids,
  loading_model,
}

interface Step6_params {
  babel_key,
  lang
  data_to_process_path

  result_folder_path

  search_levels
  match_levenshtein_distance
  dataset_is_lemmatized

  lemma_list
  id_list
  tag_list
  load_model_path

  search_method  

  next_step
  restart
}

const styles = {
  spinner: {
    height: "96px",
    width: "96px",
    marginTop: "50px"
  },
  spinner_error: {
    marginTop: "50px"
  },
  spinner_success: {
    marginTop: "50px"
  },
  spinner_waiting: {
    marginTop: "50px"
  },
  hourglass: {
    height: "96px",
    width: "auto",
    marginTop: "50px",
  }
};

const Step6 =  (p: Step6_params) => {

  const [loading_build, set_loading_build] = React.useState(true)
  const [waiting, set_waiting] = React.useState(false)
  const [error_name, set_error_name] = React.useState('')

  const build_config_and_execute = async () => {

    const dic = {
      babel_key: p.babel_key,
      lang: p.lang,
      data_to_process_path: p.data_to_process_path,

      result_folder_path: p.result_folder_path,

      search_levels: p.search_levels,
      match_levenshtein_distance: p.match_levenshtein_distance,
      dataset_is_lemmatized: p.dataset_is_lemmatized,

      lemma_list: p.lemma_list,
      id_list: p.id_list,
      tag_list: p.tag_list,
      load_model_path: p.load_model_path,

      search_method: p.search_method
    }

    window.pywebview.api.build_config(dic).then(() => {

      window.pywebview.api.execute_model().then( async () => {
        let interval = setInterval(()=> {
          window.pywebview.api.get_is_model_waiting().then((res_w) => {
            //console.log("get_is_model_waiting", res_w, waiting)

            if(!(res_w == waiting)){    
              console.log('-----------------changed waiting-------------------');
              set_waiting(res_w)
            }
          })
  
          window.pywebview.api.get_is_finished().then((res_b) => {
            //console.log("get_loading", !res_b, loading_build)

            if(!(!res_b == loading_build)){    
              console.log('-----------------changed loading_build-------------------');
              set_loading_build(!res_b)
              if(res_b) {
                clearInterval(interval)
              }
            }

          })

          window.pywebview.api.get_error().then((error) => {
            //console.log("get_error", error, error_name)

            if(error != ''){   
              console.log("get_error", error, error_name) 
              console.log('-----------------changed error-------------------');
              set_error_name(error)
              clearInterval(interval)
              
            }

          })
  
        }, 2000)
      })
    });
  }

  React.useEffect(()=> {
    build_config_and_execute().finally(()=>{
    })
  }, [])


  return (
    <Container className='view-step-container'>
      <Row className='justify-content-center'>
        <Col xs="auto" md={{offset: 0}}>
          <h1>
            Construyendo y ejecutando modelo:
          </h1>
        </Col>
      </Row>

      {
      !waiting && loading_build && !error_name && <Row className='justify-content-center'>
        <Col xs="auto" className='justify-content-center'>
          <Row className='justify-content-center'>
            <Spinner style={styles.spinner} animation="border" variant='primary'>
            </Spinner>
          </Row>
          <Row className='justify-content-center'>
            <h3>Procesando Datos.</h3>
          </Row>
        </Col>
      </Row>
      }

      {
      error_name && <Row className='justify-content-center'>
        <Col xs="auto" className='justify-content-center'>
          <Row className='justify-content-center'>
            <Icon.ExclamationTriangleFill style={styles.spinner_error} color='#d0342c' size={96}>
            </Icon.ExclamationTriangleFill>
          </Row>
          <Row className='justify-content-center'>
            <h3>{error_name}.</h3>
          </Row>
        </Col>
      </Row>
      }

      {
      !loading_build && !error_name && <Row className='justify-content-center'>
        <Col xs="auto" className='justify-content-center'>
          <Row className='justify-content-center'>
            <Icon.PatchCheckFill style={styles.spinner_success} color='#5cb85c' size={96}>
            </Icon.PatchCheckFill>
          </Row>
          <Row className='justify-content-center'>
            <h3>Los Datos fueron procesados.</h3>
          </Row>
        </Col>
      </Row>
      }

      {
      waiting && <Row className='justify-content-center'>
        <Col xs="auto" className='justify-content-center'>
          <Row className='justify-content-center'>
            <Image style={styles.hourglass} src={hourglass}></Image>
            
          </Row>
          <Row className='justify-content-center'>
            <h3>Esperando a que se refresquen los Babel Coins <br/> para seguir construyendo el modelo.</h3>
          </Row>
        </Col>
      </Row>
      }



      <Container className='bottom'>
        <Stack direction="horizontal" gap={5}>

          {(!loading_build && !waiting) && !error_name && <Button className='nav-button' onClick={() => p.restart()} as="a" variant="primary">
            Reiniciar Proceso
          </Button>}

          { (loading_build || waiting) && <Button className='nav-button' as="a" variant="secondary" style={{opacity: '0.5'}}>
            Reiniciar Proceso
          </Button>}
         
          { (!loading_build && !waiting) && !error_name && <Button className='nav-button' onClick={() => window.pywebview.api.close()} as="a" variant="success">
            Finalizar
          </Button>}

          { (loading_build || waiting) && <Button className='nav-button' onClick={() => window.pywebview.api.close()} as="a" variant="danger">
            Cerrar
          </Button>}

          { (!loading_build) && error_name && <Button className='nav-button' onClick={() => window.pywebview.api.close()} as="a" variant="danger">
            Cerrar
          </Button>}

          { (!loading_build) && error_name && <Button className='nav-button' as="a" variant="secondary" style={{opacity: '0.5'}}>
            Reiniciar Proceso
          </Button>}
        </Stack>
      </Container>
    </Container>
  )
}


export default Step6;