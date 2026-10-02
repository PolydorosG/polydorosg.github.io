const filters = document.querySelector('.filters');
const papers = [...document.querySelectorAll('.paper')];
const count = document.querySelector('#publication-count');
if (filters && count) {
  filters.hidden = false;
  const showPublications = (view) => {
    document.querySelector('.paper-list').dataset.view = view;
    for (const filter of filters.querySelectorAll('button')) {
      filter.setAttribute('aria-pressed', String(filter.dataset.filter === view));
    }
    let visible = 0;
    let lastVisible;
    for (const paper of papers) {
      const matches = view === 'all' || paper.hasAttribute('data-selected');
      paper.hidden = !matches;
      paper.classList.remove('is-last-visible');
      if (matches) {
        visible += 1;
        lastVisible = paper;
      }
    }
    lastVisible?.classList.add('is-last-visible');
    count.textContent = `(${visible})`;
  };
  showPublications('selected');
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    showPublications(button.dataset.filter);
  });
}
