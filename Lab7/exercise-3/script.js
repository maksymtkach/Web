document.querySelectorAll('#tree-container h2 span, #tree-container h3 span').forEach(span => {
    span.addEventListener('click', function() {
      const childUl = this.parentNode.nextElementSibling;
      if (childUl && childUl.tagName.toLowerCase() === 'ul') {
        childUl.classList.toggle('visible');
      }
    });
  });
  