const username = 'Takushi27';
const ignorar = ['takushi27.github.io', 'Takushi27'];

fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
  .then(res => res.json())
  .then(repos => {
    if (!Array.isArray(repos)) {
      console.error('Erro da API GitHub:', repos.message);
      grid.innerHTML = '<p>Não foi possível carregar os projetos no momento.</p>';
      return;
    }
    const grid = document.getElementById('projects-grid');

    repos
      .filter(repo => !ignorar.includes(repo.name))
      .slice(0, 6) 
      .forEach(repo => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <div class="project-info">
            <h3>${repo.name} ${repo.fork ? '<span class="fork-badge">Fork · Contribuição</span>' : ''}</h3>
            <p>${repo.description || 'Sem descrição'}</p>
            <div class="project-tags">
              ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
            </div>
            <div class="project-links">
              <a href="${repo.html_url}" target="_blank">
                <i class="fab fa-github"></i> Code
              </a>
              ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>` : ''}
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
  });s