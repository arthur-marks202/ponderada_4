class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'welcomeScene' });
    }

    preload() {
        // Carregar imagens de fundo
        this.load.image('bg01', 'assets/imagemFundo/Clouds5/1.png');
        this.load.image('bg02', 'assets/imagemFundo/Clouds5/2.png');
        this.load.image('bg03', 'assets/imagemFundo/Clouds5/3.png');
        this.load.image('bg04', 'assets/imagemFundo/Clouds5/4.png');
        this.load.image('bg05', 'assets/imagemFundo/Clouds5/5.png');

        // Carregar elementos da tela inicial
        this.load.image('SkyStorm', 'assets/welcomeScene/novoTitulo.png');
        this.load.image('startButton', 'assets/welcomeScene/Play.png');
        this.load.image('tutorialButton', 'assets/welcomeScene/tutorial.png');
    }

    create() {
        // Configuração inicial da cena
        const larguraJogo = this.sys.game.config.width;
        const alturaJogo = this.sys.game.config.height;

        this.backgrounds = []; // Corrigido: agora backgrounds é um atributo da classe

        const speeds = [0.005, 0.05, 0.07, 0.08, 0.09];

        // Criar os fundos em camadas
        for (let i = 0; i < 5; i++) {
            let bg = this.add.tileSprite(0, 0, 576, 324, `bg0${i + 1}`)
                .setOrigin(0, 0)
                .setScale(2.8);

            this.backgrounds.push({ sprite: bg, speed: speeds[i] });
        }

        // Adiciona o título do jogo
        this.add.image(larguraJogo / 2, 200, 'SkyStorm').setScale(2.5);

        // Adiciona o botão de iniciar jogo
        let startButton = this.add.image(larguraJogo / 2, 500, 'startButton').setInteractive().setScale(3);
        startButton.on('pointerdown', () => this.scene.start('SkyScene'));

        // Adiciona o botão de tutorial
        let tutorialButton = this.add.image(770, 650, 'tutorialButton').setInteractive().setScale(3);
        tutorialButton.on('pointerdown', () => this.scene.start('tutorial'));
    }

    update() {
        // Movimenta apenas no eixo X
        this.backgrounds.forEach(layer => {
            layer.sprite.tilePositionX += layer.speed; // Movimento horizontal (somente X)
        });
    }
}
