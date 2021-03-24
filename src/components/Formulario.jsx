import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/dist/v4';

const Formulario = ({crearCitas}) => {

  //crear State de citas
  const [cita, actualizarCita] = useState({

    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''

  });

  //crear State de errores
  const [error, actualizarError] = useState(false);

  //funcion que se ejecuta cada que el usuario escribe en el input
  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  //extraer los datos del formulario
  const {mascota, propietario, fecha, hora, sintomas} = cita;

  //cuando se envia el formulario
  const submitCita = e =>{
    e.preventDefault();

    //Validar
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
    hora.trim() === '' || sintomas.trim() === '' ){  
      actualizarError(true);
      // Quita el mensaje de error despues de 4 segundos
      // setTimeout(function(){ actualizarError(false); }, 4000);
      return;
    }
    //Eliminar el mensaje de error
    actualizarError(false);    
    //Crear un ID
    cita.id = uuid();
    console.log(cita);
    //Crear la cita
    crearCitas(cita);
    //Reiniciar el form
    actualizarCita({

      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''  

    });
  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error ? <p className='alerta-error'>Todos los campos deben ser completados</p>  : null}

      <form
        onSubmit={submitCita}
      >
        <label>Nombre de la mascota</label>
        <input 
          type='text'
          name='mascota'
          className='u-full-width'
          placeholder='Nombre de la mascota'
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre del propietario</label>
        <input 
          type='text'
          name='propietario'
          className='u-full-width'
          placeholder='Nombre del propietario'
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input 
          type='date'
          name='fecha'
          className='u-full-width'
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input 
          type='time'
          name='hora'
          className='u-full-width'
          onChange={actualizarState}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          name='sintomas'
          className='u-full-width'
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button
          type='submit'
          className='u-full-width button-primary'
        >Agregar cita</button>
      </form>
    </Fragment>
  );

}

Formulario.propTypes = {
  crearCitas: PropTypes.func.isRequired
}

export default Formulario;