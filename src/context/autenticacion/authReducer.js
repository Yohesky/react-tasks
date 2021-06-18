import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types"

export default (state,action) => {
    switch(action.type){
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
            
        case CERRAR_SESION:
        case LOGIN_ERROR: 
        case REGISTRO_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                mensaje: action.payload,
                usuario: null,
                autenticado: null,
                cargando: false
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                usuario: action.payload.usuario,
                autenticado: true,
                cargando: false
            }
            

        default:
            return state
    }
}