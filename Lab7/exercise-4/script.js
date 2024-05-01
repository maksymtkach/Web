function createTabs(node) {
    let tabs = Array.from(node.children).map(node => {
        let button = document.createElement('button');
        button.textContent = node.getAttribute('data-tabname');
        button.className = 'tab-button';
        return {node, button, tabs};
    });

    let tabButtons = document.createElement('div');
    tabs.forEach(tab => {
        tabButtons.appendChild(tab.button);
        tab.button.addEventListener('click', () => selectTab(tab));
    });
    node.insertBefore(tabButtons, node.firstChild);

    selectTab(tabs[0]);
}

function selectTab(selectedTab) {
    selectedTab.tabs.forEach(tab => {
        if (tab.button === selectedTab.button) {
            tab.node.style.display = 'block';
            tab.node.style.opacity = 1;
            tab.button.classList.add('active');
        } else {
            tab.node.style.display = 'none';
            tab.node.style.opacity = 0;
            tab.button.classList.remove('active');
        }
    });
}

createTabs(document.getElementById('tabs'));