class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' }); // Chama o construtor da classe base Phaser.Scene com a chave 'GameOverScene'.
    }

    preload() {
        // Carregar recursos
        this.load.image('bg01', 'assets/imagemFundo/1.png');
        this.load.image('bg02', 'assets/imagemFundo/2.png');
        this.load.image('bg03', 'assets/imagemFundo/3.png');
        this.load.image('bg04', 'assets/imagemFundo/4.png');
        this.load.image('bg05', 'assets/imagemFundo/5.png');
        this.load.image('bg06', 'assets/imagemFundo/6.png');

        this.load.image('GameOver', 'assets/GameOverScene/gameOver.png'); // Carrega a imagem de "Game Over".
        this.load.image('restartButton', 'assets/GameOverScene/restart.png'); // Carrega a imagem do botão de reinício.
    }

    create() {
        // Configuração inicial da cena
        const larguraJogo = this.sys.game.config.width; // Obtém a largura do jogo.
        const alturaJogo = this.sys.game.config.height; // Obtém a altura do jogo.

        this.add.image(larguraJogo / 2, alturaJogo / 2, 'bgs'); // Adiciona a imagem de fundo ao centro da cena.
        this.add.image(larguraJogo / 2, 200, 'GameOver').setScale(1.5); // Adiciona a imagem de "Game Over" ao centro da cena, um pouco acima do centro vertical, e aumenta sua escala.
        let button = this.add.image(larguraJogo / 2, 500, 'restartButton').setInteractive().setScale(3); // Adiciona a imagem do botão de reinício ao centro da cena, abaixo da imagem de "Game Over", torna-a interativa e aumenta sua escala.
        button.on('pointerdown', () => this.scene.start('welcomeScene')); // Adiciona um evento ao botão que, ao ser clicado0, inicia a cena 'welcomeScene'.
    
        this.bgs= []; // Corrigido: agora backgrounds é um atributo da classe

        const speeds = [0.005, 0.05, 0.07, 0.08, 0.09, 0.1]; // Velocidades de movimento dos planos de fundo

        for (let i = 0; i < 6; i++) {
            let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`)
                .setOrigin(0, 0)
                .setScale(2.8);

            this.bgs.push({ sprite: bg, speed: speeds[i] });
        }
    }

    update() {
        // Movimenta apenas no eixo X
        this.bgs.forEach(layer => {
            layer.sprite.tilePositionX += layer.speed; // Movimento horizontal (somente X)
        });
    }
}