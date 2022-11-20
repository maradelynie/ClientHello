import { useState } from 'react'
import * as api from '../../sevices'
import { useNavigate } from 'react-router-dom';

import './style.scss'
import { Formik,
   Form,
   FormikHelpers,
   Field } from 'formik';
import { useUser } from '../../hooks/useUser';
import { useAlert } from '../../hooks/useAlert';
import { useBackdrop } from '../../hooks/useBackdrop';

 type MyFormValues = {
   email: string;
   password: string;
 }

function Login() {
  const navigate = useNavigate();
  const {setupMessage} = useAlert()
  const {setupClose, setupOpen} = useBackdrop()
  const { setupUser } = useUser();
  const initialValues: MyFormValues = { email: '', password: '' };
  
  const handleLogin = async (values:MyFormValues, { setSubmitting }: FormikHelpers<MyFormValues>) => {
    try{
      setupOpen()
      const user = await api.login(values)

      setupUser(user)
      navigate('/')
      setSubmitting(false);
    }catch{
      setupMessage('Email ou senha inválidos')
    }finally{
      setupClose()
    }
    
  }

  return (
    <div className="login-container">
      <Formik
         initialValues={initialValues}
         onSubmit={handleLogin}
       >
         <Form>
           <label htmlFor="firstName">Email</label>
           <Field id="login_email" name="email" placeholder="Email" />
           <label htmlFor="firstName">Senhas</label>
           <Field id="login_password" name="password" placeholder="Senha" />
           <button type="submit">Login</button>
         </Form>
       </Formik>
    </div>
  );
}

export default Login;
