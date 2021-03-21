import React, { lazy, useState } from 'react';
import shortid from 'shortid';
import axios from 'axios';


const importModule = moduleName =>
  lazy(() =>
    import(`./modules/${moduleName}`).catch(err=>{console.log(err)})
  );


export default function App() {

  const [modules, setModules] = useState({});
  const [loading, setLoading] = useState(false);

  const addModules = modulesData => {
    if(modulesData){
      setModules({});
      modulesData.forEach(el=>{
        //if (modules[el.name]) return;
        let Module = importModule(el.name);
        //console.log(Module);
        setModules(modules => ({ ...modules, [el.name]: Module}));
      });
    }
    setLoading( false);
  }

  const loadConfig = (configUrl) => {
    setLoading( true);
    axios.get(configUrl).then(resp=>{
      setTimeout(()=>{
        if(resp.data && resp.data.configData && Array.isArray(resp.data.configData)){
          addModules(resp.data.configData);
        }
      },1000);
    }).catch(err=>{

    })
  }

  const ModuleList = ({ modules }) =>
    Object.values(modules).map(Module => {
      return (
        <Module key={shortid.generate()} />
      )
    });

  const loadingFallback = (
    <div className='text-center my-5'>
      Загрузка конфигурации <span className='spinner-border spinner-border-sm'/>
    </div>
  );

  return (
    <main>
      <section className="container my-3 text-center">
        <button className='btn btn-primary mr-3' onClick={()=>loadConfig('/config1.json')}>
          Загрузить конфигурацию 1
        </button>
        <button className='btn btn-primary mr-3' onClick={()=>loadConfig('/config2.json')}>
          Загрузить конфигурацию 2
        </button>
      </section>
      {loading
        ? loadingFallback
        : (
          <section className="container my-3">
            <React.Suspense fallback={loadingFallback}>
              <div className="row">
                <ModuleList modules={modules} />
              </div>
            </React.Suspense>
          </section>
      )}

    </main>
  );
}
