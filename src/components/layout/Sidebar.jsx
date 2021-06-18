import React, { useState } from 'react'
import Listado from '../projects/Listado';
import NuevoProyecto from '../projects/NuevoProyecto';

const Sidebar = () => {

    return ( 
        <aside>
            <h1>Mern <span>Tasks</span> </h1>

            <NuevoProyecto />

            <div className="proyectos">
                <h2>Tus proyectos</h2>

                <Listado />
            </div>
        </aside>
     );
}
 
export default Sidebar;
