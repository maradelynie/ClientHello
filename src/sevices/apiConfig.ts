import axios from 'axios'

const APIURL = process.env.REACT_APP_APIURL
const APITOKEN = process.env.REACT_APP_APITOKEN

export const sendWithAxios = async (rota:string, method:string, payload?:any) => {
  const token = sessionStorage.getItem('tokenHello')
    const result = await axios({
      url: "http://localhost:3008"+"/"+rota,
      method: method,
      data: payload,
      headers: token?{
        authorization: token || ''
      }:{},
    })
    console.log(result)
    return result
}
