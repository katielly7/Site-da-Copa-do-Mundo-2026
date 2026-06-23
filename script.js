function showSection(sectionId){
    const sections = document.querySelectorAll('.section');

    sections.forEach(section=>{
        section.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
}

function salvarAposta(){

    const jogo = document.getElementById('jogo').value;
    const nome = document.getElementById('nome').value;
    const palpite = document.getElementById('palpite').value;

    if(nome === '' || palpite === ''){
        alert('Preencha todos os campos.');
        return;
    }

    let apostas =
        JSON.parse(localStorage.getItem('apostas')) || [];

    apostas.push({
        jogo,
        nome,
        palpite
    });

    localStorage.setItem(
        'apostas',
        JSON.stringify(apostas)
    );

    mostrarApostas();

    document.getElementById('nome').value = '';
    document.getElementById('palpite').value = '';
}

function mostrarApostas(){

    const historico =
        document.getElementById('historico');

    if(!historico) return;

    let apostas =
        JSON.parse(localStorage.getItem('apostas')) || [];

    historico.innerHTML = '';

    apostas.forEach((aposta)=>{

        historico.innerHTML += `
            <div class="match-card">
                <h3>${aposta.nome}</h3>
                <p>${aposta.jogo}</p>
                <p>Palpite: ${aposta.palpite}</p>
            </div>
        `;
    });
}

mostrarApostas();
