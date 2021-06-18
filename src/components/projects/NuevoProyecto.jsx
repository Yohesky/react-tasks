import React, {useContext, useState} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {


    const proyectosContext = useContext(proyectoContext)
    const { formulario, errorFormulario ,mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext
    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    const {nombre} = proyecto
    
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        if(nombre === ''){
            mostrarError()
            return
        }

        agregarProyecto(proyecto)

        setProyecto({
            nombre: ''
        })
    }

    const onClick = () => {
        mostrarFormulario()
    }

    return ( 
        <>
        <button 
            onClick={onClick}
            type="button" 
            className="btn btn-block btn-primario"
        >
            Nuevo proyecto
        </button>

        {
            formulario 
            && (
                <form 
                onSubmit={onSubmit}
                className="formulario-nuevo-proyecto">
                    <input 
                        className="input-text"
                        placeholder="Nombre proyecto"
                        name="nombre"
                        type="text" 
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
        
                    <input 
                        className="btn btn-primario btn-block"
                        value="Agregar proyecto"
                        type="submit" 
                    />
                </form>
            )
        }

        {
            errorFormulario && <p className="mensaje error">El nombre del proyecto es obligatorio</p>
        }

        </>
     );
}
 
export default NuevoProyecto;