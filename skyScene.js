// A classe SkyScene estende Phaser.Scene para criar uma cena de jogo com uma nave espacial, meteoros e estrelas.
class SkyScene extends Phaser.Scene {
    // Construtor para SkyScene.
    constructor() {
        super({ key: 'SkyScene' }); // Chama o construtor da classe pai com a chave da cena 'SkyScene'.
    }

    meteoro = {} // Inicializa o objeto meteoro.
    
    // Pré-carrega os recursos necessários para a cena.
    preload() {
        this.load.image('background', 'assets/imagemFundo/bg_space_seamless.png'); // Carrega a imagem de fundo.
        this.load.spritesheet('naveReta', 'assets/novaNave/naveReta.png', { frameWidth: 119, frameHeight: 120 }); // Carrega a folha de sprites da nave para movimento reto.
        this.load.spritesheet('naveSobe', 'assets/novaNave/naveSobe.png', { frameWidth: 121, frameHeight: 110 }); // Carrega a folha de sprites da nave para movimento ascendente.
        this.load.spritesheet('naveDesce', 'assets/novaNave/naveDesce.png', { frameWidth: 117, frameHeight: 115 }); // Carrega a folha de sprites da nave para movimento descendente.
        this.load.spritesheet('explosao', 'assets/novaNave/explosao_nave.png', { frameWidth: 122, frameHeight: 127 }); // Carrega a folha de sprites da explosão.
        this.load.image('meteoro', 'assets/meteoros/spaceMeteors_003.png'); // Carrega a imagem do meteoro.
        this.load.image('estrela', 'assets/estrela/star_gold.png'); // Carrega a imagem da estrela.
    }

    // Cria os objetos do jogo e configura a cena.
    create() {
        const larguraJogo = this.sys.game.config.width; // Obtém a largura do jogo.
        const alturaJogo = this.sys.game.config.height; // Obtém a altura do jogo.
        
        this.pontuacao = 0; // Inicializa a pontuação em 0.
        this.geraçaoMeteoro(); // Gera um meteoro na cena.

        this.add.image(larguraJogo / 2, alturaJogo / 2, 'background'); // Adiciona a imagem de fundo ao centro da cena.

        this.nave = this.physics.add.sprite(500, 425, 'naveReta'); // Adiciona o sprite da nave à cena.
        this.nave.setCollideWorldBounds(true); // Faz a nave colidir com os limites do mundo.
        this.nave.setGravityX(-100); // Define a gravidade no eixo X para a nave.
        this.nave.setAngle(90); // Define o ângulo da nave para 90 graus.

        this.teclasAdicionais = this.input.keyboard.addKeys({ A: 'A', W: 'W', S: 'S', D: 'D' }); // Cria teclas adicionais para entrada.

        this.estrelas = this.physics.add.sprite(larguraJogo / 2, 200, 'estrela'); // Adiciona o sprite da estrela à cena.
        this.estrelas.setCollideWorldBounds(true); // Faz a estrela colidir com os limites do mundo.
        this.estrelas.setBounce(0.7); // Define o valor de quique para a estrela.

        this.placar = this.add.text(50, 80, 'Estrelas: ' + this.pontuacao, { fontSize: '45px', fill: '#FFFFFF' }); // Adiciona o texto de pontuação à cena.

        this.physics.add.overlap(this.nave, this.estrelas, this.coletarEstrela, null, this); // Adiciona detecção de sobreposição entre a nave e as estrelas.
        this.physics.add.collider(this.nave, this.meteoro, this.colisaoNave, null, this); // Adiciona detecção de colisão entre a nave e o meteoro.

        const animacoes = [
            { key: 'explosao', sprite: 'explosao', start: 0, end: 8, frameRate: 10, repeat: 0 },
            { key: 'naveReta', sprite: 'naveReta', start: 0, end: 3, frameRate: 10, repeat: -1 },
            { key: 'naveSobe', sprite: 'naveSobe', start: 0, end: 2, frameRate: 10, repeat: -1 },
            { key: 'naveDesce', sprite: 'naveDesce', start: 0, end: 2, frameRate: 10, repeat: -1 }
        ]; // Define as animações para a nave e a explosão.
        
        for (let i = 0; i < animacoes.length; i++) {
            this.anims.create({
                key: animacoes[i].key,
                frames: this.anims.generateFrameNumbers(animacoes[i].sprite, { start: animacoes[i].start, end: animacoes[i].end }),
                frameRate: animacoes[i].frameRate,
                repeat: animacoes[i].repeat
            }); // Cria as animações.
        }
    }

    // Atualiza a cena a cada frame.
    update() {
        let movendo = false; // Inicializa a variável de movimento.

        const movimentos = [
            { key: 'W', velocity: { x: 0, y: -250 }, animation: 'naveSobe' },
            { key: 'S', velocity: { x: 0, y: 250 }, animation: 'naveDesce' },
            { key: 'D', velocity: { x: 250, y: 0 }, animation: null },
            { key: 'A', velocity: { x: -250, y: 0 }, animation: 'naveReta' }
        ]; // Define os movimentos e animações para as teclas.

        movimentos.forEach(mov => {
            if (this.teclasAdicionais[mov.key].isDown) {
                this.nave.setVelocity(mov.velocity.x, mov.velocity.y); // Define a velocidade da nave.
                if (mov.animation) this.nave.anims.play(mov.animation, true); // Reproduz a animação correspondente.
                movendo = true; // Define que a nave está se movendo.
            }
        });
        
        if (!movendo) {
            this.nave.anims.play('naveReta', true); // Reproduz a animação de nave reta se não estiver se movendo.
        }

        if (this.meteoro.x < 0) {
            this.meteoro.destroy(); // Destroi o meteoro se sair da tela.
            this.geraçaoMeteoro(); // Gera um novo meteoro.
            this.physics.add.collider(this.nave, this.meteoro, this.colisaoNave, null, this); // Adiciona detecção de colisão entre a nave e o meteoro.
        }
    }

    // Função para coletar a estrela.
    coletarEstrela(nave, estrela) {
        estrela.setVisible(false); // Oculta a estrela.
        estrela.disableBody(true, true); // Desativa o corpo físico da estrela.
        this.pontuacao += 1; // Incrementa a pontuação em 1.
        this.placar.setText('Estrelas: ' + this.pontuacao); // Atualiza o texto de pontuação.

        this.time.delayedCall(1000, () => {
            let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para a estrela.
            let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para a estrela.
            this.estrelas.setPosition(1500, posY); // Define a posição da estrela.
            this.estrelas.setVisible(true); // Torna a estrela visível.
            this.estrelas.enableBody(true, 1500, posY, true, true); // Ativa o corpo físico da estrela.
        });
    }

    // Função para gerar um meteoro.
    geraçaoMeteoro() {
        let posY = Phaser.Math.Between(50, this.sys.game.config.height - 50); // Gera uma posição Y aleatória para o meteoro.
        let posX = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Gera uma posição X aleatória para o meteoro.
        this.meteoro = this.physics.add.sprite(1500, posY, 'meteoro'); // Adiciona o sprite do meteoro à cena.
        this.meteoro.setVelocityX(-200); // Define a velocidade do meteoro.
    }

    // Função para tratar a colisão da nave com o meteoro.
    colisaoNave(nave, meteoro) {
        this.physics.pause(); // Pausa a física do jogo.
        this.nave.setVisible(false); // Oculta a nave.
        let explosao = this.add.sprite(this.nave.x, this.nave.y, 'explosao'); // Adiciona o sprite da explosão à cena.
        explosao.anims.play('explosao'); // Inicia a animação de explosão.
        explosao.on('animationcomplete', () => {
            this.scene.start('GameOverScene', { pontuacao: this.pontuacao }); // Inicia a cena de Game Over.
        });
    }
}
