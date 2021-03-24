import React, {Fragment, useState, useEffect} from 'react'
import Formulario from './components/Formulario.jsx'
import Cita from './components/Cita.jsx'

function App() {

  //Verifica la disponibilidad de citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas
  const[citas, guardarCitas] = useState( citasIniciales );

  //useEffect para realizar ciertas operaciones cuando el state cambie 
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  //Funcion que muestre todas las citas y agrege la nueva
  const crearCitas = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  };

  //Funcion que elimina las citas
  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id !== id )
    guardarCitas(nuevasCitas);
  }

  const titulo = citas.length === 0 ? 'No hay citas': 'Administra tus citas';
  
  return (

    <Fragment>
      <h1> Administrador de pacientes</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario 
              crearCitas={crearCitas}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map( cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
