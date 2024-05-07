var columnTitles = document.querySelectorAll('.column-title');
  columnTitles.forEach(function(title) {
    title.setAttribute('draggable', 'false');
  });

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  