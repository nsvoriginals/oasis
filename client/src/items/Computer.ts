import { ItemType } from "../../../types/Items";
import store from "../stores";
import Item from "./Item";
import Network from "../services/Network";
import { openComputerDialog } from "../stores/ComputerStore";

export default class Computer extends Item{
    id?;string
    currentUser=new Set<string>()

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string,frame?:string){
        super(scene,x,y,texture,frame)
        this.itemType=ItemType.COMPUTER
    }
    private updatedStatus(){
        if(!this.currentUser)return
        const numberOfUsers=this.currentUser.size
        this.clearStatusBox()
        if(numberOfUsers===1){
            this.setStatusBox(`${numberOfUsers} users`)
        }
        else if (numberOfUsers > 1) {
            this.setStatusBox(`${numberOfUsers} users`)
          }
    }
    onOverlapDialog() {
        if (this.currentUser.size === 0) {
          this.setDialogBox('Press R to use computer')
        } else {
          this.setDialogBox('Press R join')
        }
      }
    
      addCurrentUser(userId: string) {
        if (!this.currentUser || this.currentUser.has(userId)) return
        this.currentUser.add(userId)
        const computerState = store.getState().computer
        if (computerState.computerId === this.id) {
          computerState.shareScreenManager?.onUserJoined(userId)
        }
        this.updatedStatus()
      }
    
      removeCurrentUser(userId: string) {
        if (!this.currentUser || !this.currentUser.has(userId)) return
        this.currentUser.delete(userId)
        const computerState = store.getState().computer
        if (computerState.computerId === this.id) {
          computerState.shareScreenManager?.onUserLeft(userId)
        }
        this.updatedStatus()
      }
    
      openDialog(playerId: string, network: Network) {
        if (!this.id) return
        store.dispatch(openComputerDialog({ computerId: this.id, myUserId: playerId }))
        network.connectToComputer(this.id)
      }
    
}