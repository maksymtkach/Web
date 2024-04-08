function createTabs(node) {
    let tabs = Array.from(node.children).map(node => {
        let button = document.createElement('button');
        button.textContent = node.getAttribute('data-tabname');
        button.className = 'tab-button';
        return {node, button};
    });

    let tabButtons = document.createElement('div');
    tabs.forEach(tab => {
        tabButtons.appendChild(tab.button);
        tab.button.addEventListener('click', () => {
            for (let tab of tabs) {
                if (tab.button === event.currentTarget) {
                    tab.node.style.display = 'block';
                    tab.button.classList.add('active');
                    setTimeout(() => tab.node.style.opacity = 1, 10);
                } else {
                    tab.node.style.display = 'none';
                    tab.node.style.opacity = 0;
                    tab.button.classList.remove('active');
                }
            }
        });
    });
    node.insertBefore(tabButtons, node.firstChild);
    tabs[0].button.click();
}

createTabs(document.getElementById('tabs'));