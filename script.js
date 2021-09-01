const canvas = document.getElementById('canvas');
const btnRestart = document.querySelector("#btn-restart");
const winner = document.querySelector('.winner');
const nextMove = document.querySelector('.next-move');
let ctx = canvas.getContext('2d');
let arr=[];
let count = 0;
let move = 'x';

// Игровое поле в виде массива
function fieldArr() {
	let a = b = 4;
	for (let i = 0; i < b; i++){
		arr[i]=[];
		for (let j = 0; j < a; j++){
			arr[i][j] = 0;
	    }
    }
}
fieldArr();

// Функция отрисовки поля
function fieldMarkup() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 400);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 400);
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400);
    ctx.moveTo(0, 100);
    ctx.lineTo(400, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(400, 200);
    ctx.moveTo(0, 300);
    ctx.lineTo(400, 300);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}
fieldMarkup();

// Обработчик клика 
function clickHandler() {
    canvas.onclick = function(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    x = Math.floor(x/100); 
    y = Math.floor(y/100);
    drawElement(x,y);
    }
}
clickHandler();

// Функция отрисовки крестиков и ноликов
function drawElement(i, j) {
    x = i*100;
    y = j*100;

    if(arr[j][i] !== 0) return;

    if(count %2 !== 0) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.arc(x + 50, y + 50, 40, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.strokeStyle = 'rgb(233, 232, 232)';
        ctx.stroke();
        arr[j][i] = 'o';
    }else {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.moveTo(x + 10, y + 10);
        ctx.lineTo(x + 90, y + 90);
        ctx.moveTo(x + 90, y + 10);
        ctx.lineTo(x + 10, y + 90);
        ctx.closePath();
        ctx.strokeStyle = 'rgb(223, 14, 14)';
        ctx.stroke();
        arr[j][i] = 'x';
    }
    checkWinner();
    showMove();
    count++;
}

// Функция определения победителя
function checkWinner() {

    move = (count %2 ===0) ? 'x' : 'o';

    for(let i = 0; i < arr.length; i++) {
// Определяем победителя по горизонтали
        if(arr[0][i]==move && arr[1][i]==move && arr[2][i]==move && arr[3][i]==move) {
            showWinner();
        }
// Определяем победителя по вертикали
        if(arr[i][0]==move && arr[i][1]==move && arr[i][2]==move && arr[i][3]==move) {
            showWinner(); 
       }
    }
// Определяем победителя по диагонали
    if(arr[0][0]==move && arr[1][1]==move && arr[2][2]==move && arr[3][3]==move) {
        showWinner();
    }
    if(arr[0][3]==move && arr[1][2]==move && arr[2][1]==move && arr[3][0]==move) {
        showWinner(); 
    }
}

// Вывод победителя на экран
function showWinner() {
    canvas.onclick = false;
    return winner.innerHTML = 'Победили:' + ' ' + move;
    
 }

 // Указатель следующего хода
function showMove() {
    if(move == 'o') {
        return nextMove.innerHTML = 'Ходят: X';
    }else {
        return nextMove.innerHTML = 'Ходят: O';
    }
}

// Функция очистки поля
btnRestart.addEventListener ('click' , restart);

function restart() {
    ctx.clearRect(0, 0, 400, 400);
    winner.innerHTML='';
    fieldMarkup();
    fieldArr();
    clickHandler();
}


