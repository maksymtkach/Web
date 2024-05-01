const container = document.getElementById('container');
document.getElementById('addBlock').addEventListener('click', addBlock);

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addBlock() {
    const blockText = prompt('Введіть текст блоку:', 'Текст');
    if (!blockText) return;

    const block = document.createElement('div');
    block.classList.add('block');
    block.style.backgroundColor = getRandomColor();
    block.textContent = blockText;

    block.style.opacity = '0';
    container.appendChild(block);
    setTimeout(() => block.style.opacity = '1', 10);

    scrollToNewElement(block);

    block.addEventListener('click', function(e) {
        e.stopPropagation();
        createPopupMenu(this);
    });
    
    block.addEventListener('mouseenter', function() {
        const originalColor = this.style.backgroundColor;
        this.style.backgroundColor = getRandomColor();
        console.log(getRandomColor());
        this.addEventListener('mouseleave', function() {
            this.style.backgroundColor = originalColor;
        }, { once: true });
    });
}

function removeBlock(block) {
    block.style.opacity = '0';
    setTimeout(() => {
        container.removeChild(block);
        checkScrollAfterRemoval();
    }, 500);
}

function checkScrollAfterRemoval() {
    if (container.scrollHeight <= container.clientHeight) {
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function scrollToNewElement(block) {
    setTimeout(() => {
        const isOverflowing = container.scrollHeight > container.clientHeight;
        const isBlockOutOfView = (block.offsetTop + block.clientHeight) > (container.scrollTop + container.clientHeight);
        
        if (isOverflowing && isBlockOutOfView) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, 500);
}

function createPopupMenu(block) {
    const menu = document.createElement('div');
    menu.classList.add('popup-menu');
    menu.style.position = 'absolute';
    menu.style.left = `${event.clientX}px`;
    menu.style.top = `${event.clientY}px`;
    menu.style.backgroundColor = '#FFF';
    menu.style.border = '1px solid #ddd';
    menu.style.padding = '10px';
    menu.style.zIndex = 1000;

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = block.style.backgroundColor;
    colorInput.addEventListener('input', (e) => {
        block.style.backgroundColor = e.target.value;
    });

    const fontSizeInput = document.createElement('input');
    fontSizeInput.type = 'number';
    fontSizeInput.value = window.getComputedStyle(block).fontSize.replace('px', '');
    fontSizeInput.addEventListener('input', (e) => {
        block.style.fontSize = `${e.target.value}px`;
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити блок';
    deleteButton.addEventListener('click', () => {
        removeBlock(block);
        menu.remove(); // Закриття меню після видалення блоку
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрити меню';
    closeButton.addEventListener('click', () => {
        menu.remove(); // Закриття меню без видалення блоку
    });

    menu.appendChild(colorInput);
    menu.appendChild(fontSizeInput);
    menu.appendChild(deleteButton);
    menu.appendChild(closeButton);

    document.body.appendChild(menu);
}



