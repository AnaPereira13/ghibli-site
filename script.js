document.getElementById('formulario-filme').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nomeDigitado = document.getElementById('nome-filme').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.innerHTML = 'Carregando...';

    try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        if (!response.ok) throw new Error('Erro na requisição da API');

        const filmes = await response.json();

        const filme = filmes.find(f => f.title.toLowerCase() === nomeDigitado.toLowerCase());

        if (filme) {
            resultadoDiv.innerHTML = `
                <h3>${filme.title}</h3>
                <p><strong>Diretor:</strong> ${filme.director}</p>
                <p><strong>Ano de lançamento:</strong> ${filme.release_date}</p>
                <p><strong>Sinopse:</strong> ${filme.description}</p>
            `;
        } else {
            resultadoDiv.innerHTML = '<p class="error">Filme não encontrado.</p>';
        }
    } catch (error) {
        resultadoDiv.innerHTML = `<p class="error">Erro ao buscar os dados. Tente novamente.</p>`;
        console.error(error);
    }
});
