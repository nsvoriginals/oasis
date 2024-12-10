import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Eye, EyeOff } from 'lucide-react'
//import {IRoomData} from '../../../types/Rooms'
import { useAppSelector } from '../hooks'

import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'

export const CreateRoomForm = () => {
  const [values, setValues] = useState<IRoomData>({
    name: '',
    description: '',
    password: null,
    autoDispose: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [nameFieldEmpty, setNameFieldEmpty] = useState(false)
  const [descriptionFieldEmpty, setDescriptionFieldEmpty] = useState(false)
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const isValidName = values.name !== ''
    const isValidDescription = values.description !== ''

    if (isValidName === nameFieldEmpty) setNameFieldEmpty(!nameFieldEmpty)
    if (isValidDescription === descriptionFieldEmpty)
      setDescriptionFieldEmpty(!descriptionFieldEmpty)

    // create custom room if name and description are not empty
    if (isValidName && isValidDescription && lobbyJoined) {
      const bootstrap = phaserGame.scene.keys.bootstrap 
      bootstrap.network
        .createCustom(values)
        .then(() => bootstrap.launchGame())
        .catch((error) => console.error(error))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-80 gap-5">
      <InputWrapper>
        <Input
          label="Name"
          variant="outline"
          value={values.name}
          onChange={handleChange('name')}
          error={nameFieldEmpty}
          helperText={nameFieldEmpty && 'Name is required'}
          className="w-full"
        />
      </InputWrapper>

      <InputWrapper>
        <Input
          label="Description"
          variant="outline"
          value={values.description}
          onChange={handleChange('description')}
          error={descriptionFieldEmpty}
          helperText={descriptionFieldEmpty && 'Description is required'}
          className="w-full"
          multiline
          rows={4}
        />
      </InputWrapper>

      <InputWrapper>
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Password (optional)"
          value={values.password || ''}
          onChange={handleChange('password')}
          className="w-full"
          endAdornment={
            <InputAdornment>
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </InputAdornment>
          }
        />
      </InputWrapper>

      <Button variant="solid" color="secondary" type="submit" className="w-full">
        Create
      </Button>
    </form>
  )
}
