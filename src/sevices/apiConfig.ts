import axios from 'axios'

const APIURL = process.env.REACT_APP_APIURL

export const sendWithAxios = async (rota:string, method:string, payload?:any) => {
  try {
    const result = await axios({
      url: APIURL+"/"+rota,
      method: method,
      data: payload
    })

    return result
  } catch {
    throw console.error('Erro ao enviar requisição')
  }
}
