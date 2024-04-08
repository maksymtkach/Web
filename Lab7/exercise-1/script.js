const container = document.getElementById('container');
container.style.position = 'relative';
const initialHeight = 500;
container.style.height = `${initialHeight}px`;
container.style.overflow = 'auto';

const colors = ['#782E5C', '#90790B', '#60435F', '#00100B', '#4C3D26'];

let maxHeight = initialHeight;

for (let i = 0; i < 5; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    const width = Math.random() * 100 + 70;
    const height = Math.random() * 100 + 50;
    const posX = Math.random() * (container.offsetWidth - width);
    const posY = Math.random() * (initialHeight + 500);

    block.style.width = `${width}px`;
    block.style.height = `${height}px`;
    block.style.position = 'absolute';
    block.style.left = `${posX}px`;
    block.style.top = `${posY}px`;
    block.innerText = `Блок ${i + 1}`;
    const colorIndex = Math.floor(Math.random() * colors.length);
    block.style.backgroundColor = colors[colorIndex];
    container.appendChild(block);

    const blockBottom = posY + height;
    if (blockBottom > maxHeight) {
        maxHeight = blockBottom;
    }
}

function addBlock() {
    const block = document.createElement('div');
    block.classList.add('block');
    const width = Math.random() * 100 + 70;
    const height = Math.random() * 100 + 50;
    const posX = Math.random() * (container.offsetWidth - width);
    const posY = Math.random() * (container.scrollHeight + 1);

    block.style.width = `${width}px`;
    block.style.height = `${height}px`;
    block.style.position = 'absolute';
    block.style.left = `${posX}px`;
    block.style.top = `${posY}px`;
    const blockId = `block-${container.children.length + 1}`;
    block.id = blockId;
    block.innerText = `Блок ${container.children.length + 1}`;
    const colorIndex = Math.floor(Math.random() * colors.length);
    block.style.backgroundColor = colors[colorIndex];
    container.appendChild(block);

    const toggler = document.createElement('button');
    toggler.innerText = `Toggle ${blockId}`;
    toggler.setAttribute('data-toggle-id', blockId);
    document.getElementById("toggles").appendChild(toggler);
}

document.getElementById('addBlock').addEventListener('click', addBlock);

document.getElementById('getSizeAndPosition').addEventListener('click', function () {
    const blocks = container.querySelectorAll('.block');
    let info = '';
    info += `<h1>Інформація</h1>`;
    blocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const relativeLeft = rect.left - containerRect.left;
        const relativeTop = rect.top - containerRect.top;

        info += `<h3>${block.innerText}</h3><ul>`;
        info += `<li>Розміри: ${rect.width.toFixed(2)}x${rect.height.toFixed(2)}</li><li>Координати вікна: (${rect.left.toFixed(2)}, ${rect.top.toFixed(2)})</li><li>Координати контейнера: (${relativeLeft.toFixed(2)}, ${relativeTop.toFixed(2)})</li></ul>`;
    });
    info += `<h3>Позиція прокрутки контейнера: ${container.scrollTop.toFixed(2)}</h3>`;

    document.getElementById('infoBlock').innerHTML = info;
});

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('block')) {
        const newSize = prompt('Введіть нові розміри блоку (формат: ширинаxвисота)', `${parseFloat(e.target.style.width).toFixed(0)}x${parseFloat(e.target.style.height).toFixed(0)}`);
        if (newSize) {
            const [width, height] = newSize.split('x').map(Number);
            e.target.style.width = `${width}px`;
            e.target.style.height = `${height}px`;
        }
    }
});

document.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-toggle-id')) {
        const targetId = e.target.getAttribute('data-toggle-id');
        const target = document.getElementById(targetId);
        if (target) {
            target.style.display = target.style.display === 'none' ? '' : 'none';
        }
    }
});

document.querySelectorAll('[data-toggle-id]').forEach(toggler => {
    toggler.addEventListener('click', function () {
        const targetId = toggler.getAttribute('data-toggle-id');
        const target = document.getElementById(targetId);
        target.style.display = target.style.display === 'none' ? '' : 'none';
    });
});
