// database
var database = firebase.database();
let room = "common"
let room1 = "player1";
let room2 = "player2";

class DBSetting{
    constructor(input_room){
        this.SetRoom(input_room);
        this.init();
    }

    GetOffset_Player1(){
        let offset = 0;
        if(room2 == this.MyRoom){
            offset = STAGE_WIDTH+STAGE_INTERVAL;
        }
        return offset;
    }

    GetOffset_Player2(){
        let offset = 0;
        if(room2 == this.PartnerRoom){
            offset = STAGE_WIDTH+STAGE_INTERVAL;
        }
        return offset;
    }


    SetRoom(input_room){
        if(room1 == input_room){
            this.PartnerRoom = room2;
            this.MyRoom = room1;
        }
        else{
            this.PartnerRoom = room1;
            this.MyRoom = room2;
        }
    }

    init(){
        const btn1 = document.getElementById(BTN_PLAYER1);
        const btn2 = document.getElementById(BTN_PLAYER2);
        const btn3 = document.getElementById(BTN_RESET);
        const btn4 = document.getElementById(BTN_START);
    
        btn1.disabled = null;
        btn2.disabled = null;
        btn3.disabled = null;
        btn4.disabled = true;

    }
}



class DBData{
    constructor(bBlock,x,y){
        this.bBlock = bBlock;
        this.x = x;
        this.y = y;
    }

}

class DBDataControl{
    constructor(input_room){
        this.DB_ID = "BLOCK";
        this.dblist = [];
        this.DBStageList = [];
        this.old_DBStageList = [];
        this.DBPartnerStageList = [];
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            for (let x = 0; x < STAGE_WIDTH; x++) {
              this.dblist.push(new DBData(false,x,y));
            }
        }
        this.cDBSetting = new DBSetting(input_room);
        this.InitStage();
        this.init_db();
    }

    init_db(){
        let str;
        for(let i = 0; i < this.dblist.length; i++){
            str = this.GetStr(i);
            database.ref(this.cDBSetting.MyRoom).child(this.DB_ID + str).update({
                bBlock:0,
                x: 0,
                y: 0
            });
        }
    }

    GetStr(i){
        let str;
        if(i < 10){
            str = "00" + String(i);
        }
        else if(i < 100){
            str = "0" + String(i);
        }
        else{
            str = String(i);
        }
        return str;
    }

    IsDiff(x,y){
        if(this.DBStageList[y][x] == this.old_DBStageList[y][x]){
            return false;
        }
        return true;
    }

    update_old(){
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            for (let x = 0; x < STAGE_WIDTH; x++) {
                this.DBStageList[y][x] = StageList[y][x]; 
            }
        }
        for (let index = 0; index < MyBlockList.length; index++) {
            let x = MyBlockList[index].x;
            let y = MyBlockList[index].y; 
            this.DBStageList[y][x] = 1; 
        }

    }

    update(){
        let str;
        let i = 0;
        this.Update_DBStageList();
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            for (let x = 0; x < STAGE_WIDTH; x++) {
                str = this.GetStr(i);
                i++;
                if(this.IsDiff(x,y)){
                    database.ref(this.cDBSetting.MyRoom).child(this.DB_ID + str).update({
                        bBlock:this.DBStageList[y][x],
                        x: x,
                        y: y
                    });        
                }
            }
        }
        this.Update_OldDBStageList();
    }

    Update_DBStageList(){
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            for (let x = 0; x < STAGE_WIDTH; x++) {
                this.DBStageList[y][x] = StageList[y][x];
            }
        }
        for (let index = 0; index < MyBlockList.length; index++) {
            let x = MyBlockList[index].x;
            let y = MyBlockList[index].y; 
            this.DBStageList[y][x] = 1; 
        }
    }


    Update_OldDBStageList(){
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            for (let x = 0; x < STAGE_WIDTH; x++) {
                this.old_DBStageList[y][x] = this.DBStageList[y][x];
            }
        }
        for (let index = 0; index < MyBlockList.length; index++) {
            let x = MyBlockList[index].x;
            let y = MyBlockList[index].y; 
            this.DBStageList[y][x] = 1; 
        }
    }
    
    InitStage(){
        this.DBStageList = new Array(STAGE_HEIGHT); // Y
        this.DBPartnerStageList = new Array(STAGE_HEIGHT);
        for (let i = 0; i < STAGE_HEIGHT; i++) {
            this.DBStageList[i] = new Array(STAGE_WIDTH); // X
            this.old_DBStageList[i] = new Array(STAGE_WIDTH); // X
            this.DBPartnerStageList[i] = new Array(STAGE_WIDTH);
        }
      
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            for (let x = 0; x < STAGE_WIDTH; x++) {
                this.DBStageList[y][x] = 0;
                this.old_DBStageList[y][x] = 0;
                this.DBPartnerStageList[y][x] = 0;
            }
        }
    }

    SetSetting(DB_ID,value){
        database.ref(room).child(DB_ID).update({
            setting:value
        });        
    }
}
/*
class Player2{

    constructor(DB_ID){
        this.DB_ID = DB_ID;
        this.pos_offset = 500;
        this.StageList = [];
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            for (let x = 0; x < STAGE_WIDTH; x++) {
            }
        }
    }

    DrawScreen(){
        context.fillStyle = "black";
        context.fillRect(0, 0, STAGE_WIDTH * BLOCK_SIZE+this.pos_offset, STAGE_HEIGHT * BLOCK_SIZE)
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            for (let x = 0; x < STAGE_WIDTH; x++) {
                if(StageList[y][x] == 1){
                    context.fillStyle = "lightskyblue";
                    context.fillRect( x*BLOCK_SIZE+this.pos_offset, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }  
    }
}
*/

let BTN_PLAYER1 = "player1";
let BTN_PLAYER2 = "player2";
let BTN_RESET = "reset";
let BTN_START = "start";
let DB_PLAYER1 = "DB_PLAYER1";
let DB_PLAYER2 = "DB_PLAYER2";
let DB_START = "DB_START";

const btn1 = document.getElementById(BTN_PLAYER1);
btn1.onclick  = function(){
    cDBDataControl = new DBDataControl(room1);
    cDBDataControl.SetSetting(DB_PLAYER1,true);
};
const btn2 = document.getElementById(BTN_PLAYER2);
btn2.onclick  = function(){
    cDBDataControl = new DBDataControl(room2);
    cDBDataControl.SetSetting(DB_PLAYER2,true);
};
const btn3 = document.getElementById(BTN_RESET);
btn3.onclick  = function(){
    cDBDataControl = new DBDataControl(room1);
    cDBDataControl.SetSetting(DB_PLAYER1,false);
    cDBDataControl.SetSetting(DB_PLAYER2,false);
    //cDBDataControl.SetSetting(DB_START,false);
};
const btn4 = document.getElementById(BTN_START);
btn4.onclick  = function(){
    //cDBDataControl.SetSetting(DB_START,true);
};

function UpdateDBtoLocal(room, data){
    if(cDBDataControl == undefined){
        return;
    }
    if(cDBDataControl.cDBSetting.MyRoom == room){  
        return;
    }

    var key = data.key;
    const v = data.val();
    cDBDataControl.DBPartnerStageList[v.y][v.x] = v.bBlock;

}

database.ref(room1).on("child_changed", function(data) {
    UpdateDBtoLocal(room1,data);
});

database.ref(room2).on("child_changed", function(data) {
    UpdateDBtoLocal(room2,data);
});

database.ref(room).on("value", function(data) {
    var key = data.key;
    const v = data.val();

    const btn1 = document.getElementById(BTN_PLAYER1);
    const btn2 = document.getElementById(BTN_PLAYER2);
    const btn3 = document.getElementById(BTN_RESET);
    const btn4 = document.getElementById(BTN_START);

    if(v.DB_PLAYER1.setting){
        btn1.disabled = true;
    }
    else{
        btn1.disabled = null;
    }
    if(v.DB_PLAYER2.setting){
        btn2.disabled = true;
    }
    else{
        btn2.disabled = null;
    }
    if(btn1.disabled == true && btn2.disabled == true){
        btn4.disabled = null;
        init();
    }
    else{
        btn4.disabled = true;
    }
    /*
    if(v.DB_START.setting){
        init();
    }
    */
});


