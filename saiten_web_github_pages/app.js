const labels=["A","B","C","D","E","F","G","H"];
const STORAGE_KEY="saiten-positions-v1";
const saved=localStorage.getItem(STORAGE_KEY);
let positions;
try{
  const parsed=saved?JSON.parse(saved):null;
  positions=Array.isArray(parsed)&&parsed.length===labels.length
    ? parsed.map(v=>Math.max(0,Math.min(8,Number(v)||0)))
    : Array(labels.length).fill(4);
}catch(e){
  positions=Array(labels.length).fill(4);
}
const board=document.getElementById("scoreBoard");

function render(){
  board.innerHTML="";
  labels.forEach((label,rowIndex)=>{
    const row=document.createElement("div");
    row.className="row";
    for(let i=0;i<9;i++){
      const cell=document.createElement("button");
      cell.type="button";
      cell.className="cell"+(i===positions[rowIndex]?" selected":"");
      if(i===positions[rowIndex]) cell.dataset.label=label;
      cell.setAttribute("aria-label",`${label}: ${i+1}段階目`);
      cell.addEventListener("click",()=>{
        positions[rowIndex]=i;
        localStorage.setItem(STORAGE_KEY,JSON.stringify(positions));
        render();
      });
      row.appendChild(cell);
    }
    const left=document.createElement("button");
    left.type="button";
    left.className="arrow left";
    left.setAttribute("aria-label",`${label}を左へ`);
    left.addEventListener("click",()=>{
      positions[rowIndex]=Math.max(0,positions[rowIndex]-1);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(positions));
      render();
    });
    const right=document.createElement("button");
    right.type="button";
    right.className="arrow right";
    right.setAttribute("aria-label",`${label}を右へ`);
    right.addEventListener("click",()=>{
      positions[rowIndex]=Math.min(8,positions[rowIndex]+1);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(positions));
      render();
    });
    row.append(left,right);
    board.appendChild(row);
  });
}
window.getResult=()=>Object.fromEntries(labels.map((x,i)=>[x,positions[i]]));
render();
