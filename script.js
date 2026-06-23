function showSection(sectionId){

const sections = document.querySelectorAll('.section');

sections.forEach(section=>{
section.classList.remove('active');
});

document.getElementById(sectionId).classList.add('active');

window.scrollTo({
top:0,
behavior:'smooth'
});

}

function salvarAposta(){

const jogo = document.getElementById('jogo').value;
const nome = document.getElementById('nome').value.trim();
const palpite = document.getElementById('palpite').value.trim();

if(nome === '' || palpite === ''){

alert('Preencha todos os campos.');
return;

}

let apostas = JSON.parse(
localStorage.getItem('apostas')
) || [];

apostas.push({
jogo,
nome,
palpite
});

localStorage.setItem(
'apostas',
JSON.stringify(apostas)
);

document.getElementById('nome').value='';
document.getElementById('palpite').value='';

mostrarApostas();

alert('Palpite salvo com sucesso!');

}

function apagarAposta(index){

let apostas = JSON.parse(
localStorage.getItem('apostas')
) || [];

apostas.splice(index,1);

localStorage.setItem(
'apostas',
JSON.stringify(apostas)
);

mostrarApostas();

}

function mostrarApostas(){

const historico =
document.getElementById('historico');

if(!historico) return;

let apostas = JSON.parse(
localStorage.getItem('apostas')
) || [];

historico.innerHTML='';

if(apostas.length===0){

historico.innerHTML=`
<div style="
margin-top:15px;
padding:15px;
background:#009c3b;
border-radius:10px;
text-align:center;">
Nenhum palpite salvo.
</div>
`;

return;

}

apostas.forEach((aposta,index)=>{

historico.innerHTML += `

<div style="
background:#009c3b;
padding:15px;
border-radius:10px;
margin-top:15px;">

<strong>${aposta.nome}</strong><br>

⚽ ${aposta.jogo}<br>

📊 Palpite: ${aposta.palpite}

<br><br>

<button
onclick="apagarAposta(${index})"
style="
background:#ffdf00;
color:#002776;
border:none;
padding:8px 12px;
border-radius:8px;
cursor:pointer;
font-weight:bold;">
Excluir
</button>

</div>

`;

});

}

document.addEventListener(
'DOMContentLoaded',
function(){

mostrarApostas();

}
);
