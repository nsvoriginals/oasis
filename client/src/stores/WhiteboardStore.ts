import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

interface WhiteboardState{
    WhiteboardDialogOpen:boolean,
    WhiteboardId:null | string
    WhiteboardUrl:null |string
    urls:Map<string,string>
}

const initialState:WhiteboardState={
    WhiteboardDialogOpen:false,
    WhiteboardId:null,
    WhiteboardUrl:null,
    urls:new Map()
}

export const whiteboardSlice = createSlice({
    name: 'whiteboard',
    initialState,
    reducers: {
      openWhiteboardDialog: (state, action: PayloadAction<string>) => {
        state.WhiteboardDialogOpen = true
        state.WhiteboardId = action.payload
        const url = state.urls.get(action.payload)
        if (url) state.WhiteboardUrl = url
        const game = phaserGame.scene.keys.game as Game
        game.disableKeys()
      },
      closeWhiteboardDialog: (state) => {
        const game = phaserGame.scene.keys.game as Game
        game.enableKeys()
        game.network.disconnectFromWhiteboard(state.WhiteboardId!)
        state.WhiteboardDialogOpen = false
        state.WhiteboardId = null
        state.WhiteboardUrl = null
      },
      setWhiteboardUrls: (state, action: PayloadAction<{ whiteboardId: string; roomId: string }>) => {
        state.urls.set(
          action.payload.whiteboardId,
          `https://wbo.ophir.dev/boards/sky-office-${action.payload.roomId}`
        )
      },
    },
  })
  
  export const { openWhiteboardDialog, closeWhiteboardDialog, setWhiteboardUrls } =
    whiteboardSlice.actions
  
  export default whiteboardSlice.reducer