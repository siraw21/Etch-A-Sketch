const gridWidth=getComputedStyle(document.body).getPropertyValue("--gridWidth");
const accentColor=getComputedStyle(document.body).getPropertyValue("--accentColor");
const inactiveColor=getComputedStyle(document.body).getPropertyValue("--inactiveColor");

const sketchArea=document.querySelector("#sketchArea");
const slider=document.querySelector("#slider");
const sliderValue=document.querySelector("#sliderValue");
const gridToggle=document.querySelector("#gridToggle");

let squaresPerSide=16;
let gridVisible=false;
let isDrawing=false;

function toggleGrid() {
  gridVisible=gridVisible ? false : true;
  gridToggle.style.color=gridVisible ? accentColor : inactiveColor;
  
  removeGridSquares();
  createGridSquares();
}

function changeBackGroundColor(e){
  if(e.type === "mousedown"){
     isDrawing=true;
     e.target.style.backgroundColor="black";
  }else if(e.type==="mouseover" && isDrawing){
     e.target.style.backgroundColor="black";
  }else {
     isDrawing=false;
  }
}

function createGridSquares(){
  const numOfSquares=(squaresPerSide * squaresPerSide);
  
   
    for(let i=0;i<numOfSquares;i++){
      const gridCell=document.createElement("div");
      let widthOrHeight=0;

      if(gridVisible){
        widthOrHeight=`${(parseInt(gridWidth)/squaresPerSide)-2}px`;
        gridCell.style.border="1px solid whitesmoke";
      }else if (!gridVisible){
        widthOrHeight=`${(parseInt(gridWidth)/squaresPerSide)}px`
        gridCell.style.border="none";
      }
      gridCell.style.width= gridCell.style.height=widthOrHeight;
      gridCell.addEventListener("mousedown",(e)=> changeBackGroundColor(e));
      gridCell.addEventListener("mouseover",(e)=> changeBackGroundColor(e));
      gridCell.addEventListener("mouseup",(e)=> changeBackGroundColor(e));
      gridCell.addEventListener("dragstart",(e)=> (e)=>{e.preventDefault()});
     
      sketchArea.appendChild(gridCell);
    }
  }
      

function removeGridSquares(){
  while(sketchArea.firstChild){
    sketchArea.removeChild(sketchArea.firstChild);
  }
}

slider.oninput =function (){
  squaresPerSide=this.value;
  sliderValue.textContent=`${this.value} X ${this.value} (Resolution)`;
  
  removeGridSquares();
  createGridSquares();
}

gridToggle.addEventListener("click",toggleGrid);
createGridSquares();
