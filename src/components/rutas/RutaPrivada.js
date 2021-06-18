import React, { useContext, useEffect } from 'react'
import authContext from '../../context/autenticacion/authContext';
import { Route, Redirect } from 'react-router';
const RutaPrivada = ({component: Component, ...props}) => {

    const autenticacionContext = useContext(authContext)
    const { autenticado, cargando, usuarioAutenticado } = autenticacionContext

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line
    }, [])

    return ( 
        <Route 
            {...props}
            render={props => !autenticado && !cargando ? (<Redirect to="/" />) : ( <Component {...props} /> ) }  
        />
     );
}
 
export default RutaPrivada;