import * as React from 'react'

import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

import { Button, Stack, Container, Row, Col, Image, ButtonGroup} from 'react-bootstrap'
import FormProgressionBar from '../FormProgressionBar/FormProgressionBar'

import Step1 from '../Steps/Step1';
import Step2 from '../Steps/Step2';
import Step3 from '../Steps/Step3';
import Step4 from '../Steps/Step4';
import Step5 from '../Steps/Step5';
import Step6 from '../Steps/Step6';

import './MainView.scss'

import logo from "../../assets/logos-bm-blue.png"
import logo_2 from "../../assets/logos-bm.black.png"

export enum search_methods {
  all_lemmas,
  first_lemma,
  by_ids,
  by_tag_ids,
  loading_model,
}


const VirtualizeSwipeableViews = virtualize(SwipeableViews);


const MainView =  () => {

  // control variables
  const [waiting_time_on_error, set_waiting_time_on_error] = React.useState(4000);
  const [not_wait_when_token_are_spend, set_not_wait_when_token_are_spend] = React.useState(false);

  // slide control variable
  const [slide, setSlide] = React.useState(0);

  // Step1Data
  const [babel_key, set_babel_key] = React.useState('');
  const [lang, set_lang] = React.useState('ES');
  const [data_to_process_path, set_data_to_process_path] = React.useState('');


  // Step2Data
  const [result_folder_path, set_result_folder_path] = React.useState('');


  // Step3Data
  const [search_levels, set_search_levels] = React.useState(2);
  const [match_levenshtein_distance, set_match_levenshtein_distance] = React.useState(2);
  const [dataset_is_lemmatized, set_dataset_is_lemmatized] = React.useState(false);

  // Step4Data

  // select method control
  const [search_method, set_search_method] = React.useState(search_methods.all_lemmas);

  const [lemma_list, set_lemma_list] = React.useState([]);
  const [id_list, set_id_list] = React.useState([]);
  const [tag_list, set_tag_list] = React.useState([]);
  const [load_model_path, set_load_model_path] = React.useState('');
 

  const load_data_from_config = () => {
    window.addEventListener('pywebviewready', () => {
      window.pywebview.api.load_config().then((data_load) => {

      if(!data_load){
        return;
      }

      set_babel_key(data_load.babel_key);
      set_lang(data_load.lang);
      set_data_to_process_path(data_load.data_to_process_path);

      set_result_folder_path(data_load.result_file_path.substring(0, data_load.result_file_path.lastIndexOf('/')));
  
      set_search_levels(data_load.search_levels);
      set_match_levenshtein_distance(data_load.match_levenshtein_distance);
      set_dataset_is_lemmatized(data_load.dataset_is_lemmatized);
  
      set_lemma_list(data_load.lemma_list);
      set_id_list(data_load.id_list);
      set_tag_list(data_load.tag_list);
      set_load_model_path(data_load.load_model_path);
      })
    })
  }

  React.useEffect(() => {
    load_data_from_config()
  }
  ,[])


  const nextStep = (back?) => {
    if(back){
      setSlide(slide - 1);
      return;
    }

    setSlide(slide + 1);
    return;
  }

  const goToStart = () => {
    setSlide(0)
  }

  const close = () => {
    window.pywebview.api.close();
  }

  const minimize = () => {
    window.pywebview.api.minimize();
  }

  return (
    <div className='view-container'>
      {
      <div className='menu'>
        <ButtonGroup>
          <Button onClick={minimize} variant="secondary">&#128469;</Button>
          <Button onClick={close} variant="secondary">&#10006;</Button>
        </ButtonGroup>
      </div>
      }

      <Container className='logo'>
      <Row className='justify-content-md-center'>
        <Col xs={6} md={4}>
          <Image className='logo' src={logo} rounded >
          </Image>
        </Col>
      </Row>
      </Container>


      <Container className='logo-2'>
      <Row className='justify-content-md-center'>
        <Col xs={6} md={4}>
          <Image className='logo-2' src={logo_2} rounded >
          </Image>
        </Col>
      </Row>
      </Container>

      <Container className='top'>
        <Row className='justify-content-md-center'>
          <Col xs={10}>
            <FormProgressionBar percentage={slide * 20} />
          </Col>
        </Row>
      </Container>
      
      <Container className='middle-container'>
      <Row className='justify-content-md-center'>
          <Col xs={10}>

        <MineSwipeableView slide={slide} listOfViews={[
          <CenterView key={0}>
            <Step1 
              babel_key = {babel_key}
              set_babel_key = {set_babel_key}

              lang = {lang}
              set_lang = {set_lang}

              data_to_process_path = {data_to_process_path}
              set_data_to_process_path = {set_data_to_process_path}

              next_step={nextStep}
            />
          </CenterView>,

          <CenterView key={1}>
            <Step2
              result_folder_path = {result_folder_path}
              set_result_folder_path = {set_result_folder_path}

              next_step={nextStep}
            ></Step2>
          </CenterView>,
            
          <CenterView key={2}>
            <Step3
                search_levels = {search_levels}
                set_search_levels = {set_search_levels}

                match_levenshtein_distance = {match_levenshtein_distance}
                set_match_levenshtein_distance = {set_match_levenshtein_distance}

                dataset_is_lemmatized = {dataset_is_lemmatized}
                set_dataset_is_lemmatized = {set_dataset_is_lemmatized}

                next_step={nextStep}
            ></Step3>
          </CenterView>,
            
          <CenterView key={3}>
            <Step4
                search_method = {search_method}
                set_search_method = {set_search_method}

                next_step={nextStep}
            ></Step4>
          </CenterView>,
            
          <CenterView key={4}>
            <Step5
              search_method = {search_method}

              lemma_list = {lemma_list}
              set_lemma_list = {set_lemma_list}

              id_list = {id_list}
              set_id_list = {set_id_list}

              tag_list = {tag_list}
              set_tag_list = {set_tag_list}            
            
              load_model_path = {load_model_path}
              set_load_model_path = {set_load_model_path}

              next_step={nextStep}

            ></Step5>
          </CenterView>,
          <CenterView key={5}>
            {
            slide == 5 &&
            <Step6
                babel_key={babel_key}
                lang={lang}
                data_to_process_path={data_to_process_path}

                result_folder_path={result_folder_path}

                search_levels={search_levels}
                match_levenshtein_distance={match_levenshtein_distance}
                dataset_is_lemmatized={dataset_is_lemmatized}

                lemma_list={lemma_list}
                id_list={id_list}
                tag_list={tag_list}
                load_model_path={load_model_path}

                search_method={search_method}

                next_step={nextStep}
                restart={goToStart}
            ></Step6>
            }
          </CenterView>      
          ]
        }
        >
              
        </MineSwipeableView> 
        </Col>
      </Row>
      </Container>
    </div>
  )
}

const styles = {
  slide: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    border: '1px solid #d9e0e4',
    boxShadow: '0px 2px 6px rgba(#002c48, 0.15)',
    marginBottom: '32px',
    height: '800px',

  },
};

const MineSwipeableView = (props) => {
  return (
    <VirtualizeSwipeableViews 
      slideRenderer ={(params) => {
      return (
        props.listOfViews[params.index]
        )
    }}


    overscanSlideAfter={1} index={props.slide}
    >
    </VirtualizeSwipeableViews>
  );
}

const CenterView = (props) => {
  return (
    <Container>
    <Row className='justify-content-center'>
      <Col style={styles.slide} xs={12}>
        {props.children}
      </Col>
    </Row>  
    </Container>
  )
}

export default MainView;