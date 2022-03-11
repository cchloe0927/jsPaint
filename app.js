const canvas = document.getElementById("jsCanvas"); //jsCanvas요소 불러옴
const ctx = canvas.getContext("2d"); //<canvas>는 context를 갖고 있는 HTML의 요소
const colors = document.getElementsByClassName("jsColor"); //각 색상들
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

//canvas에서 두가지 사이즈가 필요함 -> 1. css사이즈 2. 픽셀 수정 사이즈
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; //기본색상
ctx.fillStyle = INITIAL_COLOR; //fill색상
ctx.lineWidth = 2.5; //기본크기

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke(); //sub-path를 현재의 stroke style로 획을 그음
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveclick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image; //href는 image(URL)
    link.download = "jsPaint[🎨]"; //download는 파일명
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); //마우스의 움직임 감지 이벤트
    canvas.addEventListener("mousedown", startPainting); //클릭했을 때 발생하는 이벤트
    canvas.addEventListener("mouseup", stopPainting); //클릭에서 뗐을 때
    canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스에서 벗어났을 때
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveclick);
}