const oblast = document.getElementById("oblast");
const vreme = document.getElementById("vreme");
const input = document.getElementById("gradoviBox");
const dugmeDodaj = document.getElementById("dodaj");
const dugmeZavrsi = document.getElementById("zavrsiIgru");
const divIzabranihGradova = document.getElementById("ubaceniGradovi");
const autocomplete = document.getElementById("autocomplete");

let listaGradova = [];

// citanje podataka iz podaci.json fajla
fetch('podaci.json')
    .then(response=> response.json())
    .then(data => {
    
    //gradovi, vreme, oblast iz json fajla
    const gradovi = data.ponudjene;
    vreme.textContent = `VREME: ${formatVreme(data.vreme)}`;
    oblast.textContent = `OBLAST: ${data.oblast.toUpperCase()} `;
   
    //unos u input polje i pronalazak gradova
    input.addEventListener('input', function(){
    const inputVrednost = input.value.trim().toLowerCase();
    
    const izabraniGradovi = gradovi.filter( grad =>
        grad.toLowerCase().includes(inputVrednost));
        
        display(izabraniGradovi);     
    });

    
    //alert("Igra pocinje, imate " +formatVreme(data.vreme)+".");
    
    // vreme trajanja igre
    const tajmer = pocetnoVreme => {
        let vr = setInterval(()=> {
            if( pocetnoVreme > 0 ){
                pocetnoVreme--;
                vreme.textContent = `VREME: ${formatVreme(pocetnoVreme)}`;
            }   
            if(pocetnoVreme <= 0){ 
                console.log("igra je zavrsena");
                proveraTacnih();  
            }   
        },1000);
    }

    // provera broja tacnih gradova od izabranih gradova
    function proveraTacnih(){
       
        let brojac = 0;
        
        data.tacno.forEach(t =>{
         if(listaGradova.includes(t)){
             brojac++;
         }
        });

        let procenatTacnih = (brojac / listaGradova.length)*100;
        localStorage.setItem('procenatTacnih',procenatTacnih.toFixed(2));
        console.log(procenatTacnih.toFixed(2));
        window.location.href="results.html";
     }

  // pokretanje tajmera
  tajmer(data.vreme);
  // klikom na dugme za prekid igre
  dugmeZavrsi.addEventListener('click', proveraTacnih);
});

// formatiranje vremena
function formatVreme(s){
    let minuti = Math.floor(s / 60);
    let sekunde = s % 60;

    if(sekunde < 10){
        sekunde = "0" +sekunde;
    }
    return minuti+ "m " +sekunde+ "s";
}

// ispisivanje izabranih gradova u div
function ispisiGradUDiv(){
        divIzabranihGradova.innerHTML='';
    listaGradova.forEach( grad =>{
        const divGradova = document.createElement('div');
        divGradova.innerHTML=`
        <div class="cityDiv">
        <span class="cityName">${grad}</span>
        <button class="removeButton" onclick="obrisiGrad('${grad}')">X</button>
        </div>`;
        divIzabranihGradova.appendChild(divGradova);
    });
}

// dodavanje grada u listu
function dodajGradUListu(grad){
    if(!listaGradova.includes(grad)){
        listaGradova.push(grad);
        ispisiGradUDiv();
    }
}

//brisanje gradiva iz liste iyabranih gradova
window.obrisiGrad= function(izabraniGrad){
    listaGradova = listaGradova.filter(grad => grad !== izabraniGrad);
    ispisiGradUDiv();
}

//selektovani grad iz liste se prikazuje u input polje
function selektovaniGrad(list){
    input.value = list.innerHTML;
    autocomplete.innerHTML='';
}

// prikaz gradova koji se podudaraju sa unetim slovima
function display(res){
    const content = res.map((list)=>{
        return "<li onclick=selektovaniGrad(this)>" + list +"</li>";
     });
    autocomplete.innerHTML="<ul>" +content.join('')+"</ul>";
}

//klikom na dugme se dodaje grad u listu izabranih gradova
dugmeDodaj.addEventListener('click', function(){
    const grad = input.value.trim();
        if(grad !== ''){
            dodajGradUListu(grad);
            input.value='';
            autocomplete.innerHTML='';
        } 
});

