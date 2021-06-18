import React, { useContext, useEffect } from 'react'
import authContext from '../../context/autenticacion/authContext';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tasks/FormTarea';
import ListadoTarea from '../tasks/ListadoTarea';

const Projects = () => {

    const autenticacionContext = useContext(authContext)
    const { usuario, usuarioAutenticado } = autenticacionContext

    useEffect(() => {
        usuarioAutenticado()
    }, [])

    return ( 
       <div className="contenedor-app">
           <Sidebar />

            <div className="seccion-principal">
                {usuario && <Header nombre={usuario.nombre} />}
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTarea />
                    </div>
                </main>
            </div>

       </div>
     );
}
 
export default Projects;