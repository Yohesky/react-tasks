import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import Proyecto from './Proyecto'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import alertaContext from '../../context/alertas/alertaContext'

const Listado = () => {
    
    // obtengo los proyectos desde el state
    const proyectosContext = useContext(proyectoContext)
    const { proyectos, mensaje, obtenerProyectos } = proyectosContext

    // context de alerta
    const alertasContext = useContext(alertaContext)
    const {alerta, mostrarAlerta} = alertasContext 
    
    useEffect(() => {
        mensaje && mostrarAlerta(mensaje.msg, mensaje.categoria)
        obtenerProyectos()
    }, [mensaje])

    if(proyectos.length === 0) return ( <h4 style={{color: 'white'}}>No hay proyectos, comienza creando uno</h4> )


    return ( 

        <ul className="listado-proyectos">
            {
                alerta && (
                    <div className={`alerta ${alerta.categoria}`}>
                        {alerta.msg}
                    </div>
                )
            }
            { 
                <TransitionGroup>
                    {
                        proyectos.map((proyecto, idx) =>  
                            <CSSTransition
                                timeout={200} 
                                classNames="tarea"
                                key={proyecto._id}
                            >
                                <Proyecto  proyecto={proyecto}   />
                            </CSSTransition>
                        )
                    }
                </TransitionGroup>
            }
        </ul>

     );
}
 
export default Listado;