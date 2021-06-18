import { ACTUALIZAR_TAREA, CREAR_TAREA, ELIMINAR_TAREA, TAREAS_ERROR, TAREAS_PROYECTO, TAREA_ACTUAL } from "../../types"

export default (state,action) => {
    switch(action.type){

        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasProyecto: action.payload
            } 

           
        case TAREAS_ERROR:
            return {
                ...state,
                error: true
            }
        
        case CREAR_TAREA:
            return {
                ...state,
                tareasProyecto: [action.payload, ...state.tareasProyecto],
                error: false
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload )
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload
            }

        case ACTUALIZAR_TAREA: 
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea ),
                tareaseleccionada: null
            }
        default:
            return state
    }
}