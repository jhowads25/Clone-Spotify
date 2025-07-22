document.addEventListener('DOMContentLoaded', () => {

    // Dados para "Músicas em alta"
    const trendingData = [
        { name: 'P de pecado', artist: 'Grupo Menos É Mais,', image: './img/p-do-Pecado.jpeg' },
        { name: 'Baqueado- Ao Vivo', artist: 'Panda, icaro', image: './img/Panda-Sem-Moderação.jpg' },
        { name: 'Grupo Maluca', artist: 'Gulherme e Benuto', image: './img/grupo-maluca.jpeg' },
        { name: 'Tubarões', artist: 'Diego e Victor Hugo', image: './img/Tubarões.jpg' },
        { name: 'Caos de Alguém', artist: 'Felipe e Rodrigo', image: './img/Caos-de-Alguém.jpg' },
        { name: 'Fica com Deus Vivo', artist: 'Yan e Sorriso', image: './img/fica-com-deus-vivo.jpg' }
    ];

    // Dados para "Artistas Populares" (para o carrossel)
    const artistsData = [
        { name: 'Henrique & Juliano', image: './img/henrique-e-juliano.jpeg' },
        { name: 'Diego & Vitor Hugo', image: './img/diego-vitor-hugo.jpeg' },
        { name: 'Grupo Menos é Mais', image: './img/grupo-menos-mais.jpg' },
        { name: 'Jorge & Mateus', image: './img/jorge-mateus.jpg' },
        { name: 'Zé Neto & Cristiano', image: './img/ze-neto-e-cristiano.jpeg' },
        { name: 'Matheus & Kauan', image: './img/mateus-e-kauan.jpg' },
        { name: 'Murilo Huff', image: './img/murilo-huff.jpeg' }
    ];

    // Dados para "Singles e álbuns que todo mundo gosta"
    const albumsData = [
        { name: 'Eu Vou na Sua Casa', artist: 'Felipe Amorim', image: './img/eu-vou-na-sua-casa.jpeg' },
        { name: 'Foi Mal Deus', artist: 'Hugo & Guilherme', image: './img/foiMalDeus.jpeg' },
        { name: 'GRAU DE MALUCA', artist: 'Guilherme & Benuto', image: './img/grau-de-maluca.jpg' },
        { name: 'Não Me Provoca', artist: 'Nilo, Luísa Sonza', image: './img/nao-me-Provoca.jpeg' },
        { name: 'Senta Olhando pra Mim', artist: 'DJ Arana', image: './img/senta-olhando-pra-mim.jpeg' },
        { name: 'Paz Sem Fim', artist: 'Carol Braga', image: './img/paz-sem-fim.jpg' },
    ];

    function createCard(item, type) {
        const card = document.createElement('div');
        card.className = 'card';
        if (type === 'artist') {
            card.classList.add('artist'); // Adiciona a classe 'artist' para arredondar a imagem
        }

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${type === 'artist' ? 'Artista' : item.artist}</p>
        `;
        return card;
    }

    // Popula a grade de Músicas em Alta
    const trendingGrid = document.querySelector('#trending-section .card-grid');
    if (trendingGrid) {
        trendingData.forEach(item => {
            trendingGrid.appendChild(createCard(item, 'album'));
        });
    }

    // Popula o CARROSSEL de Artistas Populares
    const artistsCarouselTrack = document.querySelector('#artists-carousel .carousel-track');
    if (artistsCarouselTrack) {
        artistsData.forEach(artist => {
            artistsCarouselTrack.appendChild(createCard(artist, 'artist'));
        });
    }

    // Popula a grade de Álbuns
    const albumsGrid = document.querySelector('#albums-section .card-grid');
    if (albumsGrid) {
        albumsData.forEach(album => {
            albumsGrid.appendChild(createCard(album, 'album'));
        });
    }

    // --- CÓDIGO DO CARROSSEL (AGORA DENTRO DO DOMContentLoaded) ---
    const carouselContainers = document.querySelectorAll('.carousel-container');

    carouselContainers.forEach(container => {
        // Seleciona os botões associados a este carrossel específico usando data-carousel
        const prevButton = document.querySelector(`.carousel-btn.prev-btn[data-carousel="${container.id}"]`);
        const nextButton = document.querySelector(`.carousel-btn.next-btn[data-carousel="${container.id}"]`);
        const carouselTrack = container.querySelector('.carousel-track');

        // Garante que todos os elementos necessários existam antes de adicionar listeners
        if (!prevButton || !nextButton || !carouselTrack) {
            console.warn(`[Carrossel] Elementos do carrossel para #${container.id} não encontrados. Verifique seu HTML.`);
            return; // Sai da função se não encontrar todos os elementos
        }

        // Função para atualizar o estado dos botões (desabilitado/habilitado)
        const updateButtonStates = () => {
            // Desabilita o botão 'prev' se estiver no início
            prevButton.disabled = container.scrollLeft <= 0;

            // Desabilita o botão 'next' se estiver no final
            // scrollWidth é a largura total do conteúdo
            // clientWidth é a largura visível do contêiner
            // Usamos Math.ceil e adicionamos uma pequena tolerância (ex: 1px)
            // para lidar com possíveis imprecisões de arredondamento de sub-pixels
            nextButton.disabled = Math.ceil(container.scrollLeft + container.clientWidth) >= carouselTrack.scrollWidth - 1;
        };

        // Event listener para o botão "Próximo"
        nextButton.addEventListener('click', () => {
            // Verifica se existem filhos no carouselTrack antes de tentar acessar o primeiro
            if (carouselTrack.children.length === 0) return;

            const cardWidth = carouselTrack.children[0].offsetWidth; // Pega a largura de um cartão
            const gap = 24; // O mesmo gap definido no CSS
            const scrollAmount = cardWidth + gap; // Quantidade para rolar: largura do cartão + gap

            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            // Atualiza o estado dos botões após a rolagem (com um pequeno atraso para a animação)
            setTimeout(updateButtonStates, 300);
        });

        // Event listener para o botão "Anterior"
        prevButton.addEventListener('click', () => {
             // Verifica se existem filhos no carouselTrack antes de tentar acessar o primeiro
            if (carouselTrack.children.length === 0) return;

            const cardWidth = carouselTrack.children[0].offsetWidth; // Pega a largura de um cartão
            const gap = 24; // O mesmo gap definido no CSS
            const scrollAmount = cardWidth + gap; // Quantidade para rolar: largura do cartão + gap

            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
            // Atualiza o estado dos botões após a rolagem (com um pequeno atraso para a animação)
            setTimeout(updateButtonStates, 300);
        });

        // Atualiza os estados dos botões ao rolar o carrossel manualmente
        container.addEventListener('scroll', updateButtonStates);

        // Atualiza os estados dos botões na carga inicial da página e ao redimensionar a janela
        window.addEventListener('resize', updateButtonStates);

        // Chamada inicial para definir o estado dos botões
        // Um pequeno atraso pode ser útil para garantir que o layout esteja totalmente renderizado
        setTimeout(updateButtonStates, 50);
    });
});