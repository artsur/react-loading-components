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

  const addModules = modulesData => {
    if(modulesData){
      console.log('loaded config');
    }
    modulesData.forEach(el=>{
      if (modules[el.name]) return;
      let Module = importModule(el.name);
      setModules(modules => ({ ...modules, [el.name]: Module}));
    });
  }

  const loadConfig = (configUrl) => {
    axios.get(configUrl).then(resp=>{
      if(resp.data && resp.data.configData && Array.isArray(resp.data.configData)){
        addModules(resp.data.configData);
      }
    }).catch(err=>{
      /*console.log(err);
      if(err.response) console.log(err.response);*/
    })
  }


  return (
    <main>
      <section className="container my-">
        <button className='btn btn-primary mx-3' onClick={()=>loadConfig('/config1.json')}>
          Загрузить конфигурацию
        </button>
      </section>
      <section className="container">
        <React.Suspense fallback="Загрузка конфигурации">
          <div className="row">
            <ModuleList modules={modules} />
          </div>
        </React.Suspense>
      </section>
    </main>
  );
}
