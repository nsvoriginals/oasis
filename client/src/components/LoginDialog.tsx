import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Alert, AlertTitle } from '@mui/material'
import { Avatar } from '@mui/material'
import { Input } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setLoggedIn } from '../stores/UserStore'
import { getAvatarString, getColorByString } from '../util'

import Adam from '../images/login/Adam_login.png'
import Ash from '../images/login/Ash_login.png'
import Lucy from '../images/login/Lucy_login.png'
import Nancy from '../images/login/Nancy_login.png'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

const avatars = [
  { name: 'adam', img: Adam },
  { name: 'ash', img: Ash },
  { name: 'lucy', img: Lucy },
  { name: 'nancy', img: Nancy },
]

export default function LoginDialog() {
  const [name, setName] = useState<string>('')
  const [avatarIndex, setAvatarIndex] = useState<number>(0)
  const [nameFieldEmpty, setNameFieldEmpty] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
  const roomJoined = useAppSelector((state) => state.room.roomJoined)
  const roomName = useAppSelector((state) => state.room.roomName)
  const roomDescription = useAppSelector((state) => state.room.roomDescription)
  const game = phaserGame.scene.keys.game as Game

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name === '') {
      setNameFieldEmpty(true)
    } else if (roomJoined) {
      console.log('Join! Name:', name, 'Avatar:', avatars[avatarIndex].name)
      game.registerKeys()
      game.myPlayer.setPlayerName(name)
      game.myPlayer.setPlayerTexture(avatars[avatarIndex].name)
      game.network.readyToConnect()
      dispatch(setLoggedIn(true))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-xl shadow-xl w-96">
      <h2 className="text-white text-2xl mb-4">Joining</h2>
      <div className="flex items-center justify-center mb-4">
        <Avatar style={{ background: getColorByString(roomName) }} className="mr-2">
          {getAvatarString(roomName)}
        </Avatar>
        <h3 className="text-white">{roomName}</h3>
      </div>
      <div className="mb-4 flex items-center text-gray-300">
        <p>{roomDescription}</p>
      </div>
      <div className="flex mb-6">
        <div className="mr-6 w-1/3">
          <h4 className="text-white text-lg mb-2">Select an avatar</h4>
          <div className="grid grid-cols-2 gap-4">
            {avatars.map((avatar, index) => (
              <div
                key={avatar.name}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setAvatarIndex(index)}
              >
                <Avatar src={avatar.img} alt={avatar.name} className="w-24 h-32 object-cover" />
                <span className="text-white mt-2">{avatar.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <Input
            autoFocus
            fullWidth
            label="Name"
            error={nameFieldEmpty}
            helperText={nameFieldEmpty && 'Name is required'}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          {!videoConnected && (
            <div className="mt-4 flex flex-col items-center">
              <Alert variant="outlined" severity="warning">
                <AlertTitle>Warning</AlertTitle>
                No webcam/mic connected - <strong>connect one for best experience!</strong>
              </Alert>
              <Button
                color="secondary"
                onClick={() => game.network.webRTC?.getUserMedia()}
                className="mt-2"
              >
                Connect Webcam
              </Button>
            </div>
          )}

          {videoConnected && (
            <div className="mt-4 flex flex-col items-center">
              <Alert variant="outlined">Webcam connected!</Alert>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button variant="contained" color="secondary" size="large" type="submit">
          Join
        </Button>
      </div>
    </form>
  )
}
