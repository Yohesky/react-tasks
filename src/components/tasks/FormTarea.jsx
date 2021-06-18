import React, { useContext, useEffect, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const [tarea, setTarea] = useState({ nombre: '' })

    const {nombre} = tarea

    const proyectosContext = useContext(proyectoContext)
    const tareasContext = useContext(TareaContext)

    const { proyecto } = proyectosContext
    const { crearTarea, error, mostrarError, obtenerTareas, tareaseleccionada, actualizarTarea } = tareasContext

    // effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        tareaseleccionada !== null ? setTarea(tareaseleccionada) : setTarea({nombre: ''})
    }, [tareaseleccionada])

    if(!proyecto) return null

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(nombre === ''){
            mostrarError()
            return
        }

        // codigo que revisa si edita o guarda
        tareaseleccionada === null ? guardarTarea() : editarTarea()


        setTarea({
            ...tarea,
            nombre: ''
        })
        obtenerTareas(proyecto._id)
    }

    const editarTarea = _ => {
        let actTarea = {
            nombre: nombre,
            estado: true,
            proyecto: proyecto._id,
            id: tareaseleccionada.id
        }
        actualizarTarea(actTarea)
    }

    const guardarTarea = _ => {
        let newTarea = {
            nombre: nombre,
            estado: true,
            proyecto: proyecto._id
        }
        crearTarea(newTarea)

    }


    return (
        <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        name="nombre"  
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={ tareaseleccionada !== null ? 'Editar tarea' : 'Agregar tarea' }
                    />
                </div>
            </form>

            { error && ( <p className="mensaje error">El nombre de la tarea es obligatorio</p> ) }
        </div>
      );
}
 
export default FormTarea;