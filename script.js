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

if (typeof HTMLDialogElement !== 'undefined' && HTMLDialogElement.prototype.showModal) {
  const preview = document.createElement('dialog');
  preview.className = 'image-preview';
  preview.setAttribute('aria-label', 'Publication figure');
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'image-preview-close';
  closeButton.setAttribute('aria-label', 'Close image preview');
  closeButton.autofocus = true;
  const previewImage = document.createElement('img');
  preview.append(closeButton, previewImage);
  document.body.append(preview);
  let opener;

  for (const link of document.querySelectorAll('.paper-teaser')) {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      previewImage.src = link.href;
      previewImage.alt = link.querySelector('img').alt;
      preview.showModal();
      document.documentElement.classList.add('image-preview-open');
    });
  }

  closeButton.addEventListener('click', () => preview.close());
  preview.addEventListener('click', (event) => {
    if (event.target === preview) preview.close();
  });
  preview.addEventListener('close', () => {
    document.documentElement.classList.remove('image-preview-open');
    opener?.focus({ preventScroll: true });
  });
}
