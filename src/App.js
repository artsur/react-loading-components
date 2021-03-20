import React, { lazy, useState } from 'react';
import shortid from 'shortid';
import axios from 'axios';


const importModule = moduleName =>
  lazy(() =>
    import(`./modules/${moduleName}`).catch(err=>{console.log(err)})
  );


const ModuleList = ({ modules }) =>
  Object.values(modules).map(Module => (
    <Module className="col" key={shortid.generate()} />
  ));


export default function App() {

  const [modules, setModules] = useState({});
  const [loading, setLoading] = useState(false);

  const addModules = modulesData => {
    if(modulesData){
      modulesData.forEach(el=>{
        if (modules[el.name]) return;
        let Module = importModule(el.name);
        setModules(modules => ({ ...modules, [el.name]: Module}));
        //setModules(modules => ({[el.name]: Module}));
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


  return (
    <main>
      <section className="container my-3">
        <button className='btn btn-primary mr-3' onClick={()=>loadConfig('/config1.json')}>
          Загрузить конфигурацию 1
        </button>
        <button className='btn btn-primary mr-3' onClick={()=>loadConfig('/config2.json')}>
          Загрузить конфигурацию 2
        </button>
      </section>
      {loading
        ? (
          <div className='text-center my-4'>Загрузка конфигурации</div>
        )
        : (
          <section className="container my-3">
            <React.Suspense fallback="Загрузка конфигурации">
              <div className="row">
                <ModuleList modules={modules} />
              </div>
            </React.Suspense>
          </section>
      )}

    </main>
  );
}
