import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import alertaContext from '../../context/alertas/alertaContext'
import authContext from '../../context/autenticacion/authContext'
const NuevaCuenta = (props) => {

    // extraer context de alerta
    const alertasContext = useContext(alertaContext)
    const {alerta, mostrarAlerta} = alertasContext

    // extraer context de auth
    const autenticacionContext = useContext(authContext)
    const { mensaje, autenticado, registrarUsuario } = autenticacionContext

    useEffect(() => {
        autenticado && props.history.push('/proyectos')
        mensaje && mostrarAlerta(mensaje.msg, mensaje.categoria)
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // state para inciar sesion
    const [usuario, setUsuario ] = useState
    ({
        email: '', 
        password: '',
        confirmar: '',
        nombre: ''
    })

    const {email, password, confirmar, nombre } = usuario

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 carácteres', 'alerta-error')
            return
        }


        if(password !== confirmar){
            mostrarAlerta('Los password deben ser iguales', 'alerta-error')
            return
        }

        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return ( 
       <div className="form-usuario">
           { alerta && 
            (
                <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
            )
           }
           <div className="contenedor-form sombra-dark">
               <h1>Crear cuenta</h1>

            <form 
                onSubmit={onSubmit}
            >

                <div className="campo-form">
                    <label htmlFor="nombre">Nombre de usuario</label>
                    <input 
                        value={nombre}
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="nombre"
                        onChange={onChange}    
                    />
                </div>

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
                    <label htmlFor="confirmar">Confirmar password</label>
                    <input 
                        value={confirmar}
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder="Repite la contraseña"
                        onChange={onChange}    
                    />
                </div>

                <div className="campo-form">
                    <input 
                        type="submit" 
                        value="Registrar"
                        className="btn btn-primario btn-block"    
                    />
                </div>

            </form>

            <Link to={'/'} className="enlace-cuenta" >
                Iniciar sesión
            </Link>

           </div>
       </div>
     );
}
 
export default NuevaCuenta;