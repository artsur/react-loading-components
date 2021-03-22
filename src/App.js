import React, { lazy, useState } from 'react';
import shortid from 'shortid';
import axios from 'axios';


const importComponent = componentName =>
  lazy(() =>
    import(`./components/${componentName}`).catch(err=>{ console.log(err)})
  );


export default function App() {
  const [configData, setConfigData] = useState(null);
  const [modules, setModules] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  const addModules = modulesData => {
    if(modulesData){
      setModules({});
      modulesData.forEach(el=>{
        //if (modules[el.name]) return;
        let Module = importComponent(el.name);
        //console.log(Module);
        setModules(modules => ({ ...modules, [el.name]: Module}));
      });
      setErrorLoading(false);
    }else{
      setErrorLoading(true);
    }

    setLoading( false);
  }

  const loadConfig = (configUrl) => {
    setLoading( true);
    axios.get(configUrl).then(resp=>{
      if(resp.data && resp.data.configData && Array.isArray(resp.data.configData)){
        setConfigData(resp.data.configData);
        addModules(resp.data.configData);
      }
    }).catch(err=>{
      setErrorLoading(true);
    })
  }

  const ModuleList = ({ modules,place }) => {
    return Object.keys(modules).filter(modName=>{
      let find = configData.find(conf=>{
        return conf.name===modName && conf.place === place;
      });
      return find !== undefined;
    }).map(modKey=>{
      let Module = modules[modKey];
      return (
        <div className='d-block mb-3' key={shortid.generate()}>
          <Module />
        </div>
      );
    })
  }


  const loadingFallback = (
    <div className='text-center my-5'>
      Загрузка конфигурации <span className='spinner-border spinner-border-sm'/>
    </div>
  );

  const errorLoadingMessage = (
    <div className='alert alert-danger text-center my-5'>
      Ошибка конфигурации модулей
    </div>
  );

  return (
    <main>
      <section className="container my-3 text-center">
        <button className='btn btn-primary mx-3' onClick={()=>loadConfig('/config1.json')}>
          Загрузить конфигурацию 1
        </button>
        <button className='btn btn-primary mx-3' onClick={()=>loadConfig('/config2.json')}>
          Загрузить конфигурацию 2
        </button>
        <button className='btn btn-primary mx-3' onClick={()=>loadConfig('/config3.json')}>
          Демо ошибки загрузки
        </button>
      </section>

      {errorLoading
        ? errorLoadingMessage
        : (
          <section className="container my-3">
            <React.Suspense fallback={loadingFallback}>
              <div className="row">
                <div className='col-12 col-md-6'>
                  <ModuleList modules={modules} place='left-col' />
                </div>
                <div className='col-12 col-md-6'>
                  <ModuleList modules={modules} place='right-col' />
                </div>

              </div>
            </React.Suspense>
          </section>
        )
      }

    </main>
  );
}
