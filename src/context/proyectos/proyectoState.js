import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clienteAxios from '../../config/axios';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from '../../types';
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'



const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }

    // dispatch para ejecutar acciones
    const [state,dispatch] = useReducer(proyectoReducer, initialState)


    // funciones para crud del proyecto


    // funcion para mostrar el form
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // obtener los proyectos
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos')
            console.log(resultado);
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // agregar un nuevo proyecto
    const agregarProyecto = async proyecto => {
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)
            console.log(resultado);
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // mostrar error
    const mostrarError = _ => {
        dispatch({
            type: VALIDAR_FORMULARIO,
        })
    }

    // selecciona el proyecto q el usuario dio click
    const proyectoActual = id => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: id
        })
    }

    // eliminar un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <proyectoContext.Provider 
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState