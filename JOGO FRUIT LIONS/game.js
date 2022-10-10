
// Variaveis
var playerHeight, playerWidth, playerPosX, playerSpeed, playerPoints, playerImg;
var orangeImg, appleImg, pearImg, FruitPosX, FruitPosY, FruitSpeed, bombImg;
var collisionFlag, gameOver, fruitImg;

// Inicializa o jogo, carrega todos os recursos e seta o valor inicial das variaveis
function initialize(){
    
    // Seta a variavel canvas para o canvas do HTML
    canvas  = document.getElementById("stage");
    context = canvas.getContext("2d");

    // Cria e carrega todas as imagens do jogo
    orangeImg     = new Image();
    orangeImg.src = 'orange.png';
    appleImg      = new Image();
    appleImg.src  = 'apple.png';
    pearImg       = new Image();
    pearImg.src   = 'pear.png';
    bombImg       = new Image();
    bombImg.src   = 'bomb.png';
    playerImg 	  = new Image();
    playerImg.src = 'basket.png';
    
    // Seta os valores iniciais para as variaveis do jogador
    playerHeight = 115;
    playerWidth  = 120;
    playerSpeed  = 45;
    playerPoints = 00;
    playerPosX = (canvas.width/2)-(playerWidth/2);
    
    // Inicia os valores das flags do jogo
    collisionFlag = false;
    gameOver = false;
    
    // Inicia as variaveis necessarias das frutas
    FruitPosY    = -50;
    FruitSpeed    = 10;
    FruitPosX  = canvas.width/2;
    fruitImg = orangeImg;

    // Desenha a sexta de frutas na tela na posicao X e Y
    context.drawImage(playerImg, playerPosX, canvas.height-120);
    
    // Add eventos de teclado
    document.addEventListener("keydown", keyDown);
    
    // Chama o metodo gameLoop a cada 30 milisegundos
    loop = setInterval(gameLoop, 30);
}

// Funcao que controla as teclas pressionadas
function keyDown(key){
    if(key.keyCode == 37)
        if( playerPosX > 0 )
            playerPosX -= playerSpeed;
    
    if(key.keyCode == 39)
        if( playerPosX < (canvas.width - playerWidth) )
            playerPosX += playerSpeed;

    // Se o jogo ainda nao terminou desenha a sexta de frutas na tela
    if( gameOver == false )
        context.drawImage(playerImg, playerPosX, canvas.height-120);
}

function gameLoop(){

    // Limpa o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha a fruta e a sexta de frutas
    context.drawImage(fruitImg, FruitPosX, FruitPosY);
    context.drawImage(playerImg, playerPosX, canvas.height-120);

    // Se a fruta nao chegou ao final da tela, ela continua 'caindo'
    if( FruitPosY <= canvas.height ){
        FruitPosY += FruitSpeed;
    // Senao ela reseta a posicao e gera uma fruta ou bomba aleatoria
    }else{
        FruitPosY = -50;
        FruitPosX = Math.random() * (canvas.width-50);
        collisionFlag = false;

        if( (Math.random() * 4) < 1 )
            fruitImg = bombImg;
        else if( (Math.random() * 4) < 2 )
            fruitImg = appleImg;
        else if( (Math.random() * 4) < 3 )
            fruitImg = pearImg;
        else if( (Math.random() * 4) < 4 )
            fruitImg = orangeImg;
    }
    
    // Testa se a fruta 'caiu' dentro do sexto, se sim, incrementa um ponto e seta a flag colisao como true
    if( ( FruitPosX > playerPosX && FruitPosX < (playerPosX+playerWidth) ) && 
            ( FruitPosY >= canvas.height-100) &&
                collisionFlag == false &&
                    fruitImg != bombImg){
        
        playerPoints++;
        collisionFlag = true;
    // Senao, testa se o que colidiu era a bomba e da game over, e para o loop do jogo
    }else if( ( FruitPosX > playerPosX && FruitPosX < (playerPosX+playerWidth) ) && 
            ( FruitPosY >= canvas.height-playerHeight) &&
                collisionFlag == false &&
                    fruitImg == bombImg){

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "90pt Arial";
        context.fillText("VOCÊ É MUITO RUIM", (canvas.width/2)-250, 300, 500);
        gameOver = true;
        clearInterval(loop);

    }

    // Mostra os pontos do jogador na tela
    context.font = "50pt Hallway";
    context.fillText(playerPoints+" lionselite", canvas.width-140, 50, 100);
}