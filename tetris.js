


let KEY_SPACE = 32;
let KEY_LEFT = 37;
let KEY_RIGHT = 39;
let KEY_UP = 38;
let KEY_DOWN = 40;

let STAGE_WIDTH;
let STAGE_HEIGHT;
let BLOCK_SIZE = 64;

let MyBlockList = [];
let StageList = [];
let BlockPattenList = [Patten1, Patten2, Patten3, Patten4, Patten5, Patten6];
let StageMap = [];

let canvas;
let context;

let pattern;
let patternoffset = [Patten1Offset, Patten2Offset, Patten3Offset, Patten4Offset, Patten5Offset, Patten6Offset];
let mode;

let count = document.getElementById("count");

document.onkeydown = function(e) {
	var keyCode = false;

	if (e) event = e;

	if (event) {
		if (event.keyCode) {
			keyCode = event.keyCode;
		} else if (event.which) {
			keyCode = event.which;
		}
	}
    keyaction(keyCode);
};

class Pos{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

// 落下
function Down(){
    return move(0,1);
}

function init(){
    canvas = document.querySelector('#canvas');
    context = canvas.getContext('2d');
    STAGE_WIDTH = canvas.width / BLOCK_SIZE;
    STAGE_HEIGHT = canvas.height / BLOCK_SIZE;

    // ステージ表示
    InitStage();

    // 初期ブロック表示
    CreateBlock();
    ShowBlock();
}

function InitStage(){

    StageList = new Array(STAGE_HEIGHT); // Y
    for (let i = 0; i < STAGE_HEIGHT; i++) {
        StageList[i] = new Array(STAGE_WIDTH); // X 
    }
  
    for (let y = 0; y < STAGE_HEIGHT; y++) {
        for (let x = 0; x < STAGE_WIDTH; x++) {
            StageList[y][x] = 0;
        }
    }
}


//   ■ ■
// ■ ■
function Patten1(){
    let array = [new Pos(1,0), new Pos(2,0), new Pos(0,1), new Pos(1,1)];
    mode = 0;
    return array;
}

//   1 2
// 3 4

// 2
// 1 4
//   3

function Patten1Offset(){
    let x=1;
    let y=1;
    if(mode){
        x *= -1;
        y *= -1;
        mode = 0;
    }
    else{
        mode = 1;
    }
    let array = [new Pos(-1*x,1*y), new Pos(-2*x,0*y), new Pos(1*x,1*y), new Pos(0*x,0*y)];
    return array;
}

// ■ ■
//   ■ ■
function Patten2(){
    let array = [new Pos(0,0), new Pos(1,0), new Pos(1,1), new Pos(2,1)];
    mode = 0;
    return array;
}

// 1 2
//   3 4

//   1
// 3 2
// 4

function Patten2Offset(){
    let x=1;
    let y=1;
    if(mode){
        x *= -1;
        y *= -1;
        mode = 0;
    }
    else{
        mode = 1;
    }
    let array = [new Pos(1*x,0*y), new Pos(0*x,1*y), new Pos(-1*x,0*y), new Pos(-2*x,1*y)];
    return array;
}


// ■ ■
// ■ ■
function Patten3(){
    let array = [new Pos(0,0), new Pos(1,0), new Pos(0,1), new Pos(1,1)];
    mode = 0;
    return array;
}

function Patten3Offset(){
    let array = [new Pos(0,0), new Pos(0,0), new Pos(0,0), new Pos(0,0)];
    mode = 0;
    return array;
}

// ■ ■ ■ ■
function Patten4(){
    let array = [new Pos(0,0), new Pos(1,0), new Pos(2,0), new Pos(3,0)];
    mode = 0;
    return array;
}

// 1 2 3 4

// 1
// 2
// 3
// 4

function Patten4Offset(){
    let x=1;
    let y=1;
    if(mode){
        x *= -1;
        y *= -1;
        mode = 0;
    }
    else{
        mode = 1;
    }
    let array = [new Pos(0*x,0*y), new Pos(-1*x,1*y), new Pos(-2*x,2*y), new Pos(-3*x,3*y)];
    return array;
}


//   ■
// ■ ■ ■
function Patten5(){
    let array = [new Pos(1,0), new Pos(0,1), new Pos(1,1), new Pos(2,1)];
    mode = 0;
    return array;
}


//   1
// 2 3 4

//   2
//   3 1
//   4

// 
// 4 3 2
//   1

//   4
// 1 3
//   2

function Patten5Offset(){
    let array;
    switch(mode){
        case 0:
            array = [new Pos(1,1), new Pos(1,-1), new Pos(0,0), new Pos(-1,1)];
            mode = 1;
            break;
        case 1:
            array = [new Pos(-1,1), new Pos(1,1), new Pos(0,0), new Pos(-1,-1)];
            mode = 2;
            break;
        case 2:
            array = [new Pos(-1,-1), new Pos(-1,1), new Pos(0,0), new Pos(1,-1)];
            mode = 3;
            break;
        case 3:
            array = [new Pos(1,-1), new Pos(-1,-1), new Pos(0,0), new Pos(1,1)];
            mode = 0;
            break;
    }
    return array;
}

// ■
// ■ ■ ■
function Patten6(){
    let array = [new Pos(0,0), new Pos(0,1), new Pos(1,1), new Pos(2,1)];
    mode = 0;
    return array;
}

// 1
// 2 3 4
//

//   4
//   3
// 1 2

//
// 4 3 2
//     1

// 2 1
// 3
// 4 

function Patten6Offset(){
    let array;
    switch(mode){
        case 0:
            array = [new Pos(0,2), new Pos(1,1), new Pos(0,0), new Pos(-1,-1)];
            mode = 1;
            break;
        case 1:
            array = [new Pos(2,0), new Pos(1,-1), new Pos(0,0), new Pos(-1,1)];
            mode = 2;
            break;
        case 2:
            array = [new Pos(-1,-2), new Pos(-2,-1), new Pos(-1,0), new Pos(0,1)];
            mode = 3;
            break;
        case 3:
            array = [new Pos(-1,0), new Pos(0,1), new Pos(1,0), new Pos(2,-1)];
            mode = 0;
            break;
    }
    return array;
}

function RandomPattern(){
    pattern = Math.floor(Math.random() * BlockPattenList.length);
    return BlockPattenList[pattern]();
}


function CreateBlock(){
    let offsetx = 10;
    let offsety = 0;

    let array = RandomPattern();

    MyBlockList.length = 0;
    for (let index = 0; index < array.length; index++) {
        MyBlockList.push(new Pos(offsetx + array[index].x, offsety + array[index].y)); 
    }

}

function ShowBlock(){
    for (let index = 0; index < MyBlockList.length; index++) {
        DrawScreen(MyBlockList[index].x, MyBlockList[index].y); 
    }
    for (let y = 0; y < STAGE_HEIGHT; y++) {
        for (let x = 0; x < STAGE_WIDTH; x++) {
            if(StageList[y][x]){
                DrawScreen(x,y);
            }
        }
    }
}

function DrawScreen(x,y){
    context.fillStyle = "lightskyblue";
    context.fillRect( x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function AddStageBlock(){
    for (let index = 0; index < MyBlockList.length; index++) {
        let x = MyBlockList[index].x;
        let y = MyBlockList[index].y; 
        StageList[y][x] = 1; 
    }
}

function loop(){
    context.fillStyle = "black";
    context.fillRect(0, 0, STAGE_WIDTH * BLOCK_SIZE, STAGE_HEIGHT * BLOCK_SIZE)
    ShowBlock();
    if(false == Down()){
        AddStageBlock();
        CreateBlock();
    }
    DeleteLine();
}

function keyaction(keycode){
    switch(keycode){
        case KEY_SPACE:
            // スペースで回転
            lotation();
            break;
        case KEY_LEFT:
            move(-1,0);
            break;
        case KEY_RIGHT:
            move(1,0);
            break;
        case KEY_DOWN:
            move(0,1);
            break;
        default:
            break;
    }
    // 方向で移動

}

function lotation(){
    //右回転
    let array = patternoffset[pattern]();
    for (let index = 0; index < MyBlockList.length; index++) {
        MyBlockList[index].x += array[index].x;
        MyBlockList[index].y += array[index].y; 
    }

}

// 衝突判定
function IsExit(movex,movey){
    let x;
    let y;
    for (let index = 0; index < MyBlockList.length; index++) {
        x = MyBlockList[index].x + movex;
        y = MyBlockList[index].y + movey; 

        // 欄外にいるかを判定
        if((y >= STAGE_HEIGHT)||(x < 0)||(STAGE_WIDTH <= x)){
            return true;
        }   

        // ステージにあるブロックを判定
        for (let index = 0; index < StageList.length; index++) {
            if(StageList[y][x] == 1){
                return true;
            }
        }
    }
    return false;
}

// 行削除
function DeleteLine(){
    let cnt = 0;
    for (let y = 0; y < STAGE_HEIGHT; y++) {
        for (let x = 0; x < STAGE_WIDTH; x++) {
            if(StageList[y][x] == 1){
                cnt++;
            }
            else{
                cnt = 0;
                break;
            }
        }
        if(cnt >= STAGE_WIDTH){
            for (let x = 0; x < STAGE_WIDTH; x++) {
                StageList[y][x] = 0;
            }
            cnt = 0;
            let tempy = y;
            for (let index = tempy-1; 0 <= index; index--) {
                for (let x = 0; x < STAGE_WIDTH; x++) {
                    StageList[index+1][x] = StageList[index][x];               
                }
            }
            count++;
        }
    }  
}

function move(movex,movey){
    if(IsExit(movex,movey)){
        return false;
    }
    for (let index = 0; index < MyBlockList.length; index++) {
        MyBlockList[index].x += movex;
        MyBlockList[index].y += movey; 
    }
    return true;
}

init();
setInterval(loop, 200);