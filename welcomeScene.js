class welcomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'welcomeScene' });
    }

    preload() {
        // Carregar recursos
        this.load.image('background01', 'assets/welcomeScene/background01.png');
        this.load.image('SkyStorm', 'assets/welcomeScene/skyStorm.png');
        this.load.image('startButton', 'assets/welcomeScene/Play.png');
        this.load.image('tutorialButton', 'assets/welcomeScene/tutorial.png');
    }

    create() {
        // Configuração inicial da cena
        const larguraJogo = this.sys.game.config.width;
        const alturaJogo = this.sys.game.config.height;

        // Adiciona o fundo primeiro para que os botões fiquem acima dele
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'background01');

        // Adiciona o título do jogo
        this.add.image(larguraJogo / 2, 200, 'SkyStorm').setScale(1.5);

        // Adiciona o botão de iniciar jogo
        let startButton = this.add.image(larguraJogo / 2, 500, 'startButton').setInteractive().setScale(3);
        startButton.on('pointerdown', () => this.scene.start('SkyScene'));

        // Adiciona o botão de tutorial
        let tutorialButton = this.add.image(770, 650, 'tutorialButton').setInteractive().setScale(3);
        tutorialButton.on('pointerdown', () => this.scene.start('tutorial'));
    }
}