class tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorial' }); // Chama o construtor da classe Phaser.Scene com a chave 'tutorial'.
    }

    preload() {
        // Carregar recursos
        this.load.image('Tutorial', 'assets/tutorial/tutorial01.png'); // Carrega a imagem do tutorial.
        this.load.image('back', 'assets/tutorial/back.png'); // Carrega a imagem do botão de voltar.
    }

    create() {
        // Configuração inicial da cena
        const larguraJogo = this.sys.game.config.width; // Obtém a largura do jogo.
        const alturaJogo = this.sys.game.config.height; // Obtém a altura do jogo.    

        this.add.image(larguraJogo / 2, alturaJogo / 2, 'Tutorial'); // Adiciona a imagem de fundo ao centro da cena.
        let button = this.add.image(470, 780, 'back').setInteractive().setScale(2); // Adiciona o botão de voltar, torna-o interativo e aumenta seu tamanho.
        button.on('pointerdown', () => this.scene.start('welcomeScene')); // Adiciona um evento ao botão para mudar para a cena 'welcomeScene' quando clicado.
    }
}
