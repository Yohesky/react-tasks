import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    const tareasContext = useContext(TareaContext)
    const proyectosContext = useContext(proyectoContext)
    const {proyecto} = proyectosContext
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext

    const handleDelete = () => {
        eliminarTarea(tarea._id, proyecto._id)
        obtenerTareas(proyecto._id)
    }


    // funciona q modifica el estado de la tarea
    const cambiar = _ => {
        tarea.estado ? tarea.estado = false : tarea.estado = true
        actualizarTarea(tarea)
    }


    const selecccionarTarea = _ => {
        guardarTareaActual(tarea)
    }

    return ( 
        <li className="tarea sombra">
            <p> {tarea.nombre} </p>

            <div className="estado">
                { tarea.estado 
                    ? <button onClick={cambiar} type="button" className="completo">Completo</button>
                    :   <button onClick={cambiar} type="button" className="incompleto">
                            Incompleto
                        </button>
                }
            </div>

            <div className="acciones">
                <button
                    onClick={selecccionarTarea}
                    className="btn btn-primario" 
                    type="button"
                >Editar</button>
                <button onClick={ () =>  handleDelete()} className="btn btn-secundario" type="button">Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;