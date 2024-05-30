const rezultatTacnih = document.getElementById("results");
 
let procenat = parseFloat(localStorage.getItem('procenatTacnih')) || 0;

rezultatTacnih.textContent = `Ukupno tacnih:${Math.round(procenat)}%`;

prikaziRezultat(procenat);

// iscrtavanje bar grafikona
function prikaziRezultat(procenat){
  
 let canvas = document.getElementById("chartView");
 let procenatText = document.getElementById("textResult");

 let ctx = canvas.getContext('2d');
 let trenutniProcenat = 0;
 let pocetakBara = 0;

  function animate(){
 
    if(trenutniProcenat <= procenat){
      trenutniProcenat += 1;
      
     pocetakBara = canvas.width * (trenutniProcenat / 100);
 
     //crni okvir
     ctx.strokeStyle='black';
     ctx.lineWidth = 5;
     ctx.strokeRect(0, 0, canvas.width, canvas.height);

     //zeleni unutrasnji deo
     ctx.fillStyle = 'rgb(87, 170, 112)';
     ctx.fillRect(0,0, pocetakBara, canvas.height);

     procenatText.textContent = `${Math.round(procenat)}%`;
     procenatText.style.left = procenat;

     requestAnimationFrame(animate)
     }
   }
 animate();
}
