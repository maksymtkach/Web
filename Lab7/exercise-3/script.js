document.querySelector('#tree-container').addEventListener('click', function(event) {
  if (event.target.closest('h2 span, h3 span')) {
    const childUl = event.target.parentNode.nextElementSibling;
    if (childUl && childUl.tagName.toLowerCase() === 'ul') {
      childUl.classList.toggle('visible');
    }
  }
});
