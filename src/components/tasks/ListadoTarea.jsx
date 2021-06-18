import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoTarea = () => {

    const proyectosContext = useContext(proyectoContext)
    const tareasContext = useContext(TareaContext)
    const { proyecto, eliminarProyecto } = proyectosContext


    if(!proyecto) return ( <h2>Selecciona un proyecto</h2> ); 
    const { tareasProyecto } = tareasContext

    return ( 
        <>
            <h2>Proyecto: {proyecto.nombre} </h2>
            <ul className="listado-tareas">
                    {   tareasProyecto.length === 0 
                        ?  (<li className="tarea"> <p>No hay tareas</p> </li>)
                        :  

                        <TransitionGroup>
                            {
                                tareasProyecto.map((tarea, idx) => (
                                    <CSSTransition timeout={200} classNames="tarea" key={tarea._id} > 
                                        <Tarea tarea={tarea} /> 
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                    }
            </ul>

            <button 
                onClick={ () => eliminarProyecto(proyecto._id) }
                type="button"
                className="btn btn-eliminar">
                        Eliminar proyecto &times;
            </button>
        </>
     );
}
 
export default ListadoTarea;