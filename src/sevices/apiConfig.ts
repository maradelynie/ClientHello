import axios from 'axios'

const APINOCODEURL = process.env.REACT_APP_APINOCODEURL
const APIURL = process.env.REACT_APP_APIURL

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const sendWithAxiosNoCode = async (rota:string, method:string, payload?:any, header?:any) => {
    const result = await axios({
      url: APINOCODEURL+"/"+rota,
      method: method,
      data: payload,
      headers: {...header}})
    return result
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const sendWithAxios = async (rota:string, method:string, payload?:any) => {
  const token = sessionStorage.getItem('tokenHello')
    const result = await axios({
      url: APIURL+"/"+rota,
      method: method,
      data: payload,
      headers: token?{
        authorization: token || ''
      }:{},
    })
    return result
}
