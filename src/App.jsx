import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Projects from './components/projects/Projects';
import RutaPrivada from './components/rutas/RutaPrivada';
import tokenAuth from './config/authToken';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';

const token = localStorage.getItem('token')
token && tokenAuth(token)

function App() {
  return (
  <AuthState>
    <AlertaState>
      <TareaState>
        <ProyectoState>
            <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
              <RutaPrivada exact path="/proyectos" component={Projects} />
            </Switch>
          </Router>
        </ProyectoState>
      </TareaState>
    </AlertaState>
  </AuthState>
  );
}
export default App;
