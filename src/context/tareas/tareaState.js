import React, { useReducer } from 'react'
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import { v4 as uuidv4 } from 'uuid';
import { ACTUALIZAR_TAREA, CREAR_TAREA, ELIMINAR_TAREA, TAREAS_ERROR, TAREAS_PROYECTO, TAREA_ACTUAL } from '../../types';
import clienteAxios from '../../config/axios';
const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        error: false,
        tareaseleccionada: null
    }

    // crear dispatch y state
    const [state,dispatch] = useReducer(TareaReducer, initialState)


    // funciones para las tareas

    // obtener las tareas segun id
    const obtenerTareas = async proyecto => {
        const resultado = await clienteAxios.get(`/api/tareas`, {params: { proyecto }});
        console.log(resultado)
        dispatch({
            type: TAREAS_PROYECTO,
            payload: resultado.data.tareas
        })
        try {
            
        } catch (error) {
            console.log(error);
        }

    }

    // crear una tarea
    const crearTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            console.log(resultado);
            dispatch({
                type: CREAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }


    // mostrar error tareas
    const mostrarError = _ => {
        dispatch({
            type: TAREAS_ERROR
        })
    }
    
    // eliminar una tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }


    // extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }


    // actualizar tarea
    const actualizarTarea = async tarea => {
        console.log(tarea)
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.existeTarea
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                error: state.error,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                crearTarea,
                mostrarError,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState
