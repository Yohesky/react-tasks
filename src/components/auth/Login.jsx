import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import alertaContext from '../../context/alertas/alertaContext'
import authContext from '../../context/autenticacion/authContext'
const Login = (props) => {

    // context para login
    const autenticacionContext = useContext(authContext)
    const { iniciarSesion, mensaje, autenticado } = autenticacionContext

    // extraer context de alerta
    const alertasContext = useContext(alertaContext)
    const {alerta, mostrarAlerta} = alertasContext

    useEffect(() => {
        autenticado && props.history.push('/proyectos')
        mensaje && mostrarAlerta(mensaje.msg, mensaje.categoria)
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // state para inciar sesion
    const [usuario, setUsuario ] = useState({email: '', password: ''})

    const {email, password} = usuario

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son requeridos', 'alerta-error')
            return
        }

        iniciarSesion({email,password})
    }

    return ( 
       <div className="form-usuario">
            { alerta && 
                (
                    <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
                )
            }
            
           <div className="contenedor-form sombra-dark">
               <h1>Iniciar sesión</h1>

            <form 
                onSubmit={onSubmit}
            >
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input 
                        value={email}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={onChange}    
                    />
                </div>

                <div className="campo-form">
                    <label htmlFor="password">Password</label>
                    <input 
                        value={password}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChange}    
                    />
                </div>

                <div className="campo-form">
                    <input 
                        type="submit" 
                        value="Iniciar sesión"
                        className="btn btn-primario btn-block"    
                    />
                </div>

            </form>

            <Link to={'/nueva-cuenta'} className="enlace-cuenta" >
                Crear cuenta
            </Link>

           </div>
       </div>
     );
}
 
export default Login;