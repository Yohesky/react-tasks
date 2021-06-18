import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {
    const proyectosContext = useContext(proyectoContext)
    const tareasContext = useContext(TareaContext)

    const { proyectoActual } = proyectosContext
    const { obtenerTareas } = tareasContext
 
    // evento para agregar el proyecto actual y para pasar el id del proyecto para obtener tareas
    const seleccionarProyecto = id => {
        proyectoActual(id); // fija un proyecto actual
        obtenerTareas(id); // funcion para filtrar las tareas segun proyecto
    }

    return ( 
        <li>
            <button
                 onClick={ () => seleccionarProyecto(proyecto._id) }
                 type="button" 
                 className="btn btn-blank" 
                 style={{color: 'white'}}
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;