class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' }); // Chama o construtor da classe base Phaser.Scene com a chave 'GameOverScene'.
    }

    preload() {
        // Carregar recursos
        this.load.image('background02', 'assets/GameOverScene/background02.png'); // Carrega a imagem de fundo.
        this.load.image('GameOver', 'assets/GameOverScene/gameOver.png'); // Carrega a imagem de "Game Over".
        this.load.image('restartButton', 'assets/GameOverScene/restart.png'); // Carrega a imagem do botão de reinício.
    }

    create() {
        // Configuração inicial da cena
        const larguraJogo = this.sys.game.config.width; // Obtém a largura do jogo.
        const alturaJogo = this.sys.game.config.height; // Obtém a altura do jogo.    

        this.add.image(larguraJogo / 2, alturaJogo / 2, 'background02'); // Adiciona a imagem de fundo ao centro da cena.
        this.add.image(larguraJogo / 2, 200, 'GameOver').setScale(1.5); // Adiciona a imagem de "Game Over" ao centro da cena, um pouco acima do centro vertical, e aumenta sua escala.
        let button = this.add.image(larguraJogo / 2, 500, 'restartButton').setInteractive().setScale(3); // Adiciona a imagem do botão de reinício ao centro da cena, abaixo da imagem de "Game Over", torna-a interativa e aumenta sua escala.
        button.on('pointerdown', () => this.scene.start('welcomeScene')); // Adiciona um evento ao botão que, ao ser clicado, inicia a cena 'welcomeScene'.
    }
}