import axios from 'axios'


/* eslint-disable  @typescript-eslint/no-explicit-any */
export const sendWithAxiosNoCode = async (rota:string, method:string, payload?:any, header?:any) => {
  const APINOCODEURL = process.env.REACT_APP_APINOCODEURL
    const result = await axios({
      url: APINOCODEURL+"/"+rota,
      method: method,
      data: payload,
      headers: {...header}})
    return result
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const sendWithAxios = async (rota:string, method:string, payload?:any) => {
  const APIURL = process.env.REACT_APP_APIURL
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
