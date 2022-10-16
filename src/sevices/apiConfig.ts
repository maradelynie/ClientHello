import axios from 'axios'

const APIURL = process.env.REACT_APP_APIURL
const APITOKEN = process.env.REACT_APP_APITOKEN

export const sendWithAxios = async (rota:string, method:string, payload?:any, headers?:any) => {
  try {
    const result = await axios({
      url: APIURL+"/"+rota,
      method: method,
      data: payload,
      headers: {
        ...headers,
        key: APITOKEN || ''
      }
    })

    return result
  } catch {
    throw console.error('Erro ao enviar requisição')
  }
}
