import React, {useReducer} from 'react'
import tokenAuth from '../../config/authToken'
import clienteAxios from '../../config/axios'
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from '../../types'
import authContext from './authContext'
import authReducer from './authReducer'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state,dispatch] = useReducer(authReducer, initialState)

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
            usuarioAutenticado()

        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // retorna el usuario autenticado
    const usuarioAutenticado = async _ => {
        const token = localStorage.getItem('token')
        token && tokenAuth(token)
        try {
            const respuesta = await clienteAxios.get('/api/auth')
            console.log("=> res",respuesta.data);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,

            })
        }
    }

    // login
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos)
            console.log(respuesta);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            usuarioAutenticado()
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }   
    }


    const cerrarSesion = _ => {
        dispatch({
            type: CERRAR_SESION,
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState
