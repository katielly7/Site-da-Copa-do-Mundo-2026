function showSection(sectionId){

const sections=document.querySelectorAll(".section");

sections.forEach(section=>{
section.classList.remove("active");
});

const section=document.getElementById(sectionId);

if(section){
section.classList.add("active");
}

window.scrollTo({
top:0,
behavior:"smooth"
});

}

function salvarAposta(){

const jogo=document.getElementById("jogo").value;
const nome=document.getElementById("nome").value.trim();
const palpite=document.getElementById("palpite").value.trim();

if(nome==="" || palpite===""){

alert("Preencha todos os campos.");
return;

}

let apostas=JSON.parse(localStorage.getItem("apostas")) || [];

apostas.push({

jogo:jogo,
nome:nome,
palpite:palpite,
data:new Date().toLocaleString("pt-BR")

});

localStorage.setItem(
"apostas",
JSON.stringify(apostas)
);

document.getElementById("nome").value="";
document.getElementById("palpite").value="";

mostrarApostas();

alert("Palpite salvo com sucesso!");

}

function apagarAposta(indice){

let apostas=JSON.parse(localStorage.getItem("apostas")) || [];

apostas.splice(indice,1);

localStorage.setItem(
"apostas",
JSON.stringify(apostas)
);

mostrarApostas();

}

function limparApostas(){

if(confirm("Deseja apagar todos os palpites?")){

localStorage.removeItem("apostas");

mostrarApostas();

}

}

function mostrarApostas(){

const historico=document.getElementById("historico");

if(!historico)return;

let apostas=JSON.parse(localStorage.getItem("apostas")) || [];

historico.innerHTML="";

if(apostas.length===0){

historico.innerHTML=`

<div style="
background:#009c3b;
padding:20px;
border-radius:12px;
text-align:center;
margin-top:20px;">

Nenhum palpite salvo.

</div>

`;

return;

}

apostas.forEach((aposta,index)=>{

historico.innerHTML+=`

<div style="
background:#009c3b;
padding:18px;
margin-top:15px;
border-radius:12px;">

<h3>

👤 ${aposta.nome}

</h3>

<p>

⚽ ${aposta.jogo}

</p>

<p>

📊 Palpite: <strong>${aposta.palpite}</strong>

</p>

<p>

🗓️ ${aposta.data}

</p>

<button
onclick="apagarAposta(${index})"
style="
margin-top:12px;
background:#ffdf00;
color:#002776;
border:none;
padding:10px 15px;
border-radius:8px;
cursor:pointer;
font-weight:bold;">

Excluir

</button>

</div>

`;

});

historico.innerHTML+=`

<button
onclick="limparApostas()"
style="
margin-top:20px;
width:100%;
padding:14px;
background:#d62828;
color:white;
border:none;
border-radius:10px;
font-size:16px;
font-weight:bold;
cursor:pointer;">

🗑️ Apagar Todos os Palpites

</button>

`;

}

document.addEventListener("DOMContentLoaded",()=>{

mostrarApostas();

const primeira=document.querySelector(".section");

if(primeira){

primeira.classList.add("active");

}

});
