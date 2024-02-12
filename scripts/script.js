var guardaImg = document.querySelector('.container_img');
var trueImg = document.querySelector('.verdadeiro');
const Navbar = document.querySelector('.navbar')



guardaImg.addEventListener('mousemove', function (e) {
    trueImg.style.opacity = 1;

    var react = trueImg.getBoundingClientRect();

    var x = e.clientX - react.left;
    var y = e.clientY - react.top;

    trueImg.style.clipPath = `circle(50px at ${x}px ${y}px)`;
})

guardaImg.addEventListener('mouseleave', function () {
    trueImg.style.clipPath = 'circle(0px)';
})




// Definindo a função mostrarTexto com um parâmetro 'id'
function mostrarTexto(id) {
    // Selecionando todos os elementos com a classe 'texto' dentro de elementos com a classe 'container_texto'
    var textos = document.querySelectorAll('.container_texto .texto');

    // Iterando sobre a lista de elementos 'textos'
    textos.forEach(function (texto) {
        // Definindo o estilo de cada elemento para 'none' (ocultando)
        texto.style.display = 'none';
        texto.style.opacity = '0'
    });

    // Obtendo o elemento com o ID concatenado com '_txt'
    var textoClicado = document.getElementById(id + '_txt');

    // Verificando se o elemento foi encontrado
    if (textoClicado) {
        // Definindo o estilo do elemento para 'flex' (exibindo)
        textoClicado.style.display = 'flex';
        textoClicado.style.opacity = '1';
    }

    if(!textoClicado){
        textoClicado.style.display = 'none'
        textoClicado.style.opacity = '0'
        console.log('bah cthe')
    }

    var corpo = document.querySelector('.skills');


    function ocultarTodosTextos() {
        textos.forEach(function (texto) {
            texto.style.display = 'none';
            texto.style.opacity = '0'
        });
    }

    document.addEventListener('click', function(event) {
        // Verifica se o alvo do clique não está dentro do elemento com a classe 'skills'
        if (!corpo.contains(event.target)) {
            // Se o clique foi fora, oculta o texto
            ocultarTodosTextos();
        }
    });

    }

// Selecionando todos os elementos de imagem dentro de elementos com a classe 'container_skills' 
// e adicionando um ouvinte de evento de clique a cada imagem
var imagens = document.querySelectorAll('.container_skills .img img');
var body = document.querySelectorAll('.body')

imagens.forEach(function (imagem) {
    // Adicionando um ouvinte de evento de clique a cada imagem
    imagem.addEventListener('click', function () {
        // Obtendo o ID do pai da imagem
        var id = imagem.parentElement.id;

        // Chamando a função mostrarTexto com o ID obtido
        mostrarTexto(id);
    });


});


















//TYPPING EFFECT 

const titulo = document.querySelector('.typing_text');
typeWriter(titulo);

function typeWriter(e){
    const textoArray = e.innerHTML.split('');
    e.innerHTML = '';
    textoArray.forEach((letra, i) => {
        setTimeout(() => e.innerHTML += letra, 50 * i)
    });
}















const selecBox = document.querySelector(".select-box"),
selectXBtn = selecBox.querySelector(".option .playerX"),
selectOBtn = selecBox.querySelector(".option .playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=> {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick","clickedBox(this)");
        
    }

    selectXBtn.onclick = ()=>{
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
    }
    selectOBtn.onclick = ()=>{
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class","players active player");
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        playerSign = "X";
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    },randomDelayTime);
    
}

function bot(runBot){
        if(runBot){
        let array = [];
        playerSign = "O";
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
            
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.add("active");
                allBox[randomBox].setAttribute("id", playerSign);
            
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            } 
            selectWinner(); 
        }
        allBox[randomBox].style.pointerEvents = "none";
    }
}

function getClass(idname){
    return document.querySelector(".box"+ idname).id;
}

function checkClass(val1,val2,val3,sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign))
    {
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        },700);
        wonText.innerHTML = `Jogador <p>${playerSign}</p> Ganhou!`;
    }else{

        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""  ){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            },700);
            wonText.textContent = `Jogo Empatou!`;
        }

    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}