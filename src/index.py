import os
import threading
import webview

from proyect_logic.utils import write_dic_to_yaml, get_data_from_config_file
from proyect_logic.BabelMatcher import BabelTermsMatcher
from proyect_logic.process_by_all_lemmas_with_padchest_data import ExecClass as ExecClassAllLemmas
from proyect_logic.process_by_first_lemma_with_padchest_data import ExecClass as ExecClassFirstLemmas
from proyect_logic.process_by_id_list_with_padchest_data import ExecClass as ExecClassId
from proyect_logic.process_by_id_and_tag_list_with_padchest_data import ExecClass as ExecClassIdTag
from proyect_logic.process_with_saved_model import ExecClass as ExecClassModel

class Api:
    def __init__(self):
        self.model_data = None
        self.model_instance = None
        self.run_status = 2             # status no inicializado es 2
        self.error_catched = ''
        self.interrupt = False
        
        self.search_method = {
            'all_lemmas': 0,
            'first_lemma': 1,
            'by_ids': 2,
            'by_tag_ids': 3,
            'loading_model': 4
        }
    
    def fullscreen(self):
        webview.windows[0].toggle_fullscreen()
        
    def close(self):
        webview.windows[0].destroy()
        
    def minimize(self):
        webview.windows[0].minimize()

    def check_file_exist(self, file_path):
        check = False
        if(os.path.isfile(file_path) and file_path.endswith('.csv')):
            check = True
       
            try:
                file = open(file_path, "r")
                columns = file.readline().split(',')
                check = check and 'Report' in columns and 'ImageID' in columns         
                file.close()
                
                return check
            except:
                return False
            
        return check
    
    def check_folder_exits(self, folder_path):
        if(os.path.exists(folder_path) and os.path.isdir(folder_path)):
            return True
        return False

    def save_content(self, content):
        filename = webview.windows[0].create_file_dialog(webview.SAVE_DIALOG)
        if not filename:
            return

        with open(filename, 'w') as f:
            f.write(content)

    def ls(self):
        return os.listdir('.')
    
    def get_data_file(self):
        file_types = ['Csv Files (*.csv)']
        
        filename = webview.windows[0].create_file_dialog(webview.OPEN_DIALOG, file_types=file_types)
        
        if not filename:
            return ''
        
        print(filename)
        return filename[0].replace('\\','/')
    
    def get_result_folder(self):
        
        filename = webview.windows[0].create_file_dialog(webview.FOLDER_DIALOG)
        
        if not filename:
            return ''
        
        print(filename)
        return filename[0].replace('\\','/')
    
    def load_config(self):
        return get_data_from_config_file()
    
    def build_config(self, model_data):
        
        self.model_data = model_data
        
        result_folder = model_data['result_folder_path'].strip() 
        
        #if result_folder[len(result_folder)-1] != '/':
        #    result_folder += '/' 
        
        config_to_write = {
            "babel_key" : model_data['babel_key'] ,
            "lang" : model_data['lang'] ,
            "data_to_process_path" : model_data['data_to_process_path'].strip() ,
            
            "result_file_path" : result_folder + '/result.json' ,
            "save_model_path" : result_folder + '/model_saved' ,
            "save_pattern_path" : result_folder + '/pattern.json' ,
            "save_html_view" : result_folder + '/result.html' ,
            
            "search_levels" : model_data['search_levels'] ,
            "match_levenshtein_distance" : model_data['match_levenshtein_distance'] ,
            "dataset_is_lemmatized" : model_data['dataset_is_lemmatized'] ,
            
            "lemma_list" : [ i.strip() for i in model_data['lemma_list']] ,
            "id_list" : [i.strip() for i in model_data['id_list']] ,
            "tag_list" : [i.strip() for i in model_data['tag_list']] ,
            "load_model_path" : model_data['load_model_path'].strip() ,
            "waiting_time_on_error": 300,
            "not_wait_when_token_are_spend": False
        }
        
        write_dic_to_yaml(config_to_write)
        
        return model_data

    def execute_model(self):
        
        self.model_instance = None
    
      
        if (self.model_data['search_method'] == self.search_method['all_lemmas']):
            self.model_instance = ExecClassAllLemmas()
        elif (self.model_data['search_method'] == self.search_method['first_lemma']):
            self.model_instance = ExecClassFirstLemmas()
        elif (self.model_data['search_method'] == self.search_method['by_ids']):
            self.model_instance = ExecClassId()
        elif (self.model_data['search_method'] == self.search_method['by_tag_ids']):
            self.model_instance = ExecClassIdTag()
        elif (self.model_data['search_method'] == self.search_method['loading_model']):
            self.model_instance = ExecClassModel()
              
        self.thread = BabelTermsMatcher.execute_async(None, self.error_catcher, [])
        #self.error_catcher()
    
    def reset_model(self):
        self.model_instance.babelTermsMatcher.doNotWaitForServer = True
        self.thread = None
        self.model_instance = None
        self.error_catched = ''
    
    def get_is_model_waiting(self):
        return self.model_instance.babelTermsMatcher.waiting
    
    def get_is_finished(self):
        return self.model_instance.finish
    
    def get_error(self):      
        if(self.error_catched):
            #return f"Error {type(self.error_catched).__name__}"
            return str(self.error_catched)
        else:
            return ''
   
    def error_catcher(self):    
        try:
            self.model_instance.exec()
            self.run_status = 1
            self.error_catched = ''

        except Exception as error:
            self.run_status = 0
            self.error_catched = error
    
    def get_interrupt(self):
        return self.interrupt
    
    def toggle_interrupt(self):
        self.interrupt = not self.interrupt

def get_entrypoint():
    def exists(path):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))

    if exists('../gui/index.html'): # unfrozen development
        return '../gui/index.html'

    if exists('../Resources/gui/index.html'): # frozen py2app
        return '../Resources/gui/index.html'

    if exists('./gui/index.html'):
        return './gui/index.html'

    raise Exception('No index.html found')


def set_interval(interval):
    def decorator(function):
        def wrapper(*args, **kwargs):
            stopped = threading.Event()

            def loop(): # executed in another thread
                while not stopped.wait(interval): # until stopped
                    function(*args, **kwargs)

            t = threading.Thread(target=loop)
            t.daemon = True # stop if the program exits
            t.start()
            return stopped
        return wrapper
    return decorator



entry = get_entrypoint()

if __name__ == '__main__':
    window = webview.create_window('BabelMatcher', entry, js_api=Api(), fullscreen=False, width=1920, height=1080) 
    webview.start(debug=True)
