    const totalPokemons = 168;
    const limit = 10;

    function carregarPagina(page) {
      const offset = (page - 1) * limit;
      $('#pokemons tbody').empty();

      for (let i = offset + 1; i <= Math.min(offset + limit, totalPokemons); i++) {
        $.getJSON(`https://pokeapi.co/api/v2/pokemon/${i}`, (data) => {
          const id = data.id;
          const nome = data.name;
          const imagem = data.sprites.front_default;
          const altura = (data.height / 10).toFixed(1);
          const peso = (data.weight / 10).toFixed(1);
          const especie = data.species.name;

          $('#pokemons tbody').append(`
            <tr>
              <td><img src="${imagem}" alt="${nome}"></td>
              <td>#${id} - ${nome}</td>
              <td>${especie}</td>
              <td>${altura}</td>
              <td>${peso}</td>
            </tr>
          `);
        });
      }
    }

    function criarPaginacao() {
      const totalPages = Math.ceil(totalPokemons / limit);
      const $pagination = $('#pagination');
      $pagination.empty();

      $pagination.append(`<li class="page-item"><a class="page-link" href="#" data-page="prev">Previous</a></li>`);

      for (let i = 1; i <= totalPages; i++) {
        $pagination.append(`
          <li class="page-item ${i === 1 ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>
        `);
      }

      $pagination.append(`<li class="page-item"><a class="page-link" href="#" data-page="next">Next</a></li>`);

      $pagination.on('click', 'a', function (e) {
        e.preventDefault();
        let currentPage = $('#pagination .active a').data('page');
        let target = $(this).data('page');

        if (target === 'prev') {
          if (currentPage > 1) target = currentPage - 1;
          else return;
        } else if (target === 'next') {
          if (currentPage < totalPages) target = currentPage + 1;
          else return;
        }

        $('#pagination .page-item').removeClass('active');
        $(`#pagination a[data-page="${target}"]`).parent().addClass('active');
        carregarPagina(target);
      });
    }

    $(document).ready(() => {
      criarPaginacao();
      carregarPagina(1);
    });