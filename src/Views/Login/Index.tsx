import { useState } from 'react'
import * as api from '../../sevices'
import { useNavigate } from 'react-router-dom';

import './style.scss'


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async ( e:React.SyntheticEvent ) => {
    e.preventDefault()
    const dataCredentials = {
      email,
      password
    }
    const login = await api.login(dataCredentials)
    const {token} = login

    await sessionStorage.setItem('tokenHello', token)

    navigate('/')
  }
  return (
    <div className="login-container">
      <section>
        <header>
          <h1>Hell.O</h1>
          <p>identifique-se</p>
        </header>
        <form onSubmit={e=>handleLogin(e)}>
          <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='email' required/>
          <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='senha' required/>
          <button type='submit' >Enviar</button>
        </form>
      </section>
    </div>
  );
}

export default Login;
