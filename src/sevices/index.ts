import * as apiConfig from './apiConfig'

type CredentialsType = {
  email:string,
  password:string
}

export const login = async ({email, password}:CredentialsType) => {
  const dataSend = {
    email,
    password
  }
 try{
  const response = await apiConfig.sendWithAxios('token', 'POST',dataSend)
  return response.data
  }catch{
    console.error("erro ao logar")
  }
  
}

export const connect = async () => {
 
 try{
  const response = await apiConfig.sendWithAxios('serialPort', 'GET')
  return response.data
  }catch{
    console.error("erro ao logar")
  }
  
}

