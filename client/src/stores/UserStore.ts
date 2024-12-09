import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { sanitizeId } from '../util'
import {BackgroundMode} from '../../../types/BackgroundMode'
import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'

export function getInitialbackgroundMode(){
    const currentHour=new Date().getHours()
    return currentHour > 6 && currentHour <=18 ?BackgroundMode.DAY:BackgroundMode.NIGHT
}

export const userSlice =createSlice({
    name:'user',
    initialState:{
        backgroundMode:getInitialbackgroundMode(),
        sessionId:'',
        videoConnected:false,
        loggedIn:false,
        playerNameMap:new Map<string,string>(),
        showJoystick:window.innerWidth<650
    },
    reducers:{
       toogleBackgroundMode:(state)=>{
        const newMode=state.backgroundMode===BackgroundMode.DAY ? BackgroundMode.NIGHT :BackgroundMode.DAY
        state.backgroundMode=newMode   
        const Bootstrap=phaserGame.scene.keys.bootstrap as Bootstrap
        Bootstrap.changeBackgroundMode(newMode)
    },
    setSessionId:(state,action:PayloadAction<string>)=>{
        state.sessionId=action.payload
    },

    setVideoConnected: (state, action: PayloadAction<boolean>) => {
        state.videoConnected = action.payload
      },
      setLoggedIn: (state, action: PayloadAction<boolean>) => {
        state.loggedIn = action.payload
      },
      setPlayerNameMap: (state, action: PayloadAction<{ id: string; name: string }>) => {
        state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.name)
      },
      removePlayerNameMap: (state, action: PayloadAction<string>) => {
        state.playerNameMap.delete(sanitizeId(action.payload))
      },
      setShowJoystick: (state, action: PayloadAction<boolean>) => {
        state.showJoystick = action.payload
      },
    },
  })



  
  export const {
    toogleBackgroundMode,
    setSessionId,
    setVideoConnected,
    setLoggedIn,
    setPlayerNameMap,
    removePlayerNameMap,
    setShowJoystick
  }=userSlice.actions


  export default userSlice.reducer