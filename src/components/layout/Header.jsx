import React, { useContext, useEffect } from 'react'
import authContext from '../../context/autenticacion/authContext';

const Header = ({nombre}) => {

    const autenticacionContext = useContext(authContext)
    const { cerrarSesion } = autenticacionContext

    return ( 
        <header className="app-header">
            <p className="nombre-usuario">Hola <span> {nombre.toUpperCase()} </span></p>

            <div className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={ () => cerrarSesion() }
                >
                    Cerrar sesión
                </button>
            </div>

        </header>
     );
}
 
export default Header;