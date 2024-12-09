import { Client,Room } from "colyseus.js";
import { IComputer,IChatMessage,IPlayer,IWhiteboard, IOfficeState } from "../../../types/IOfficeState";
import { Message } from "../../../types/Messages";
import { IRoomData,RoomType } from "../../../types/Rooms";
import {ItemType} from '../../../types/Items'
import WebRTC from "../web/webRTC";
import {phaserEvents,Event} from '../events/EventCenter'
import store from "../stores";
import { setSessionId ,setPlayerNameMap,removePlayerNameMap} from "../stores/UserStore";
import { setLobbyJoined,setJoinedRoomData,setAvailabeRooms,removeAvailableRooms, addAvailableRooms } from "../stores/RoomStore";
import { pushChatMessage,pushPlayerJoinedMessage,pushPlayerLeftMessage } from "../stores/ChatStore";


export default class Network{
    connectToWhiteboard(id: string) {
        throw new Error('Method not implemented.');
    }
    connectToComputer(id: any) {
        throw new Error("Method not implemented.");
    }
    private client:Client
    private room?:Room<IOfficeState>
    private lobby!:Room
    webRTC?:WebRTC
    mySessionId!:string

    constructor(){
        const protocol=window.location.protocol.replace('http','ws')
        const endpoint=process.env.NODE_ENV==='production'?
        import.meta.env.VITE_SERVER_URL
        :`${protocol}//${window.location.hostname}:2567`
        this.client=new Client(endpoint)
        this.joinLobbyRoom().then(()=>{
            store.dispatch(setLobbyJoined(true))
        })
        phaserEvents.on(Event.MY_PLAYER_NAME_CHANGE,this.updatePlayerName,this)
        phaserEvents.on(Event.MY_PLAYER_TEXTURE_CHANGE,this.updatePlayer,this)
        phaserEvents.on(Event.PLAYER_DISCONNECTED,this.playerStreamDisconnect,this)
    }


    async joinLobbyRoom(){
       this.lobby=await this.client.joinOrCreate(RoomType.LOBBY)
       //THIS IS BY NSHESHIVARDHAN 
       this.lobby.onMessage('rooms',(rooms)=>{
        store.dispatch(setAvailabeRooms(rooms))
       })
       this.lobby.onMessage('+',([roomId,room])=>{
        store.dispatch(addAvailableRooms({roomId,room}))
       })
       this.lobby.onMessage('-',(roomId)=>{
        store.dispatch(removeAvailableRooms(roomId))
       })

    }



    async joinOrCreate(){
        this.room=await this.client.joinOrCreate(RoomType.PUBLIC)
        this.initialize()
    }

    async joinCustomById(roomId:string,password:string| null){
        this.room=await this.client.joinById(roomId,{password})
    }
      
    async createCustom(roomData:IRoomData){
        const {name,description,password,autoDispose}=roomData
        this.room=await this.client.create(RoomType.CUSTOM,{
        name,description,password,autoDispose
        })
        this.initialize()
    
    }



    initialize(){
    if(!this.room) return
    this.lobby.leave()
    this.mySessionId=this.room.sessionId
    store.dispatch(setSessionId(this.room.sessionId))
    this.webRTC=new WebRTC(this.mySessionId,this)
    this.room.state.players.onAdd = (player: IPlayer, key: string) => {
        if (key === this.mySessionId) return
        player.onChange = (changes) => {
            changes.forEach((change) => {
              const { field, value } = change
              phaserEvents.emit(Event.PLAYER_UPDATED, field, value, key)
    
              // when a new player finished setting up player name
              if (field === 'name' && value !== '') {
                phaserEvents.emit(Event.PLAYER_JOINED, player, key)
                store.dispatch(setPlayerNameMap({ id: key, name: value }))
                store.dispatch(pushPlayerJoinedMessage(value))
              }
            })
          }
        }


        this.room.state.players.onRemove = (player: IPlayer, key: string) => {
            phaserEvents.emit(Event.PLAYER_LEFT, key)
            this.webRTC?.deleteVideoStream(key)
            this.webRTC?.deleteOnCalledVideoStream(key)
            store.dispatch(pushPlayerLeftMessage(player.name))
            store.dispatch(removePlayerNameMap(key))
          }
      

    
    }



}




