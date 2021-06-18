import clienteAxios from "./axios"

const tokenAuth = token => {
    token 
    ? clienteAxios.defaults.headers.common['x-auth-token'] = token
    : delete clienteAxios.defaults.headers.common['x-auth-token']
}

export default tokenAuth