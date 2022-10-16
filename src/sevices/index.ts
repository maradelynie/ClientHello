import * as apiConfig from './apiConfig'

type CredentialsType = {
  email:string,
  password:string
}
type TorneioCreateType = {
 name:string
}
type PlayerCreateType = {
  name:string,
  category: string
 }
 type PlayerDeleteType = {
  key:string
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

export const getTorunaments = async () => {
 try{
  const response = await apiConfig.sendWithAxios('0idmwbdjtq3v4d1lq4o34gd31s54i934', 'GET')
  return response.data
  }catch{
    console.error("erro ao obter torneios")
  }
  
}
export const getTorunament = async (id:string) => {
  try{
   const response = await apiConfig.sendWithAxios('r2mvt1f6wludndkivtq06upimbz97aah', 'GET', null,{tournament:id} )
   return response.data
   }catch{
     console.error("erro ao obter torneios")
   }
   
 }

export const postTorunaments = async (dataTournament:TorneioCreateType) => {
  try{
   const response = await apiConfig.sendWithAxios('r2mvt1f6wludndkivtq06upimbz97aah', 'POST',dataTournament)
   return response.data
   }catch{
     console.error("erro ao criar torneio")
   }
   
 }
 export const postPlayer = async (dataPlayer:PlayerCreateType, id:string) => {
  try{
   const response = await apiConfig.sendWithAxios('92lifkj4demkm16tk5jc3vaj78pdmawx', 'POST',{player:dataPlayer}, {tournament:id})
   return response.data
   }catch{
     console.error("erro ao criar torneio")
   }
   
 }
 export const putPlayer = async (dataPlayer:PlayerCreateType, id:string) => {
  try{
   const response = await apiConfig.sendWithAxios('92lifkj4demkm16tk5jc3vaj78pdmawx', 'PUT',{player:dataPlayer}, {tournament:id})
   return response.data
   }catch{
     console.error("erro ao criar torneio")
   }
   
 }
 export const deletePlayer = async (dataPlayer:PlayerDeleteType, id:string) => {
  try{
   const response = await apiConfig.sendWithAxios('92lifkj4demkm16tk5jc3vaj78pdmawx?player='+dataPlayer.key, 'DELETE',null, {tournament:id})
   return response.data
   }catch{
     console.error("erro ao criar torneio")
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

