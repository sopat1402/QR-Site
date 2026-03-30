var butt=document.querySelector(".qr-gen");
var size=document.querySelectorAll(".dropdown-item").length;
var inp=document.querySelector('input');
var container=document.querySelector('.qr-cont');

async function generateQR() {
  const text = inp.value;
  const type=inp.placeholder;
  const response=await fetch("http://localhost:3000/generate",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        type: type,
        data: text
    })
  });
  const result=await response.json();
  document.querySelector("#qr-disp").src=`${result.qrImage}`;
}
for (var i=0;i<size;i++){
    document.querySelectorAll('.dropdown-item')[i].addEventListener("click",(event)=>{
        inp.placeholder=event.srcElement.innerHTML;
        document.querySelector('.dropdown-toggle').textContent=event.srcElement.innerHTML;
    })
}


butt.addEventListener("click",generateQR);