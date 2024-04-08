const redLight = document.getElementById('red-light');
const yellowLight = document.getElementById('yellow-light');
const greenLight = document.getElementById('green-light');
const startButton = document.getElementById('start');
const manualSwitchButton = document.getElementById('manual-switch');
const stateDescription = document.getElementById('state-description');

let currentLight = 'red';
let flashingTimes = 0;

const switchLight = (nextLight) => {
    redLight.style.backgroundColor = nextLight === 'red' ? 'red' : 'grey';
    yellowLight.style.backgroundColor = nextLight === 'yellow' ? 'yellow' : 'grey';
    greenLight.style.backgroundColor = nextLight === 'green' ? 'green' : 'grey';

    if (nextLight === 'flashing yellow') {
        yellowLight.style.animation = 'flash 1s infinite';
    } else {
        yellowLight.style.animation = 'none';
    }

    stateDescription.textContent = nextLight.toUpperCase();
};

const getDuration = (light) => {
    const durationInput = document.getElementById(`${light}-duration`);
    let duration = parseInt(durationInput.value);
    if (isNaN(duration)) {
        if (light === 'red') return 5;
        if (light === 'yellow') return 3;
        if (light === 'green') return 7;
    }
    return duration;
};

const cycleLights = () => {
    switch (currentLight) {
        case 'red':
            switchLight('red');
            setTimeout(() => { currentLight = 'yellow'; cycleLights(); }, getDuration('red') * 1000);
            break;
        case 'yellow':
            switchLight('yellow');
            setTimeout(() => { currentLight = 'green'; cycleLights(); }, getDuration('yellow') * 1000);
            break;
        case 'green':
            switchLight('green');
            setTimeout(() => { currentLight = 'flashing yellow'; cycleLights(); }, getDuration('green') * 1000);
            break;
        case 'flashing yellow':
            if (flashingTimes < 3) {
                switchLight('flashing yellow');
                setTimeout(() => { flashingTimes++; cycleLights(); }, 1000);
            } else {
                flashingTimes = 0;
                currentLight = 'red';
                cycleLights();
            }
            break;
    }
};

startButton.addEventListener('click', cycleLights);

manualSwitchButton.addEventListener('click', () => {
    if (currentLight === 'red') currentLight = 'yellow';
    else if (currentLight === 'yellow') currentLight = 'green';
    else if (currentLight === 'green') currentLight = 'flashing yellow';
    else if (currentLight === 'flashing yellow') {
        currentLight = 'red';
        flashingTimes = 0;
    }
    cycleLights();
});