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
    let duration = parseInt(durationInput.value, 10);

    if (duration < 0 || duration > 60) {
        alert(`Please enter a valid duration for the ${light} light (0-60 seconds).`);
        return false;
    }
    return duration || (light === 'red' ? 5 : light === 'yellow' ? 3 : 7);
};

const cycleLights = () => {
    let duration;

    switch (currentLight) {
        case 'red':
            duration = getDuration('red');
            if (duration === false) return; // Stop if invalid
            switchLight('red');
            currentLight = 'yellow';
            setTimeout(cycleLights, duration * 1000);
            break;
        case 'yellow':
            duration = getDuration('yellow');
            if (duration === false) return; // Stop if invalid
            switchLight('yellow');
            currentLight = 'green';
            setTimeout(cycleLights, duration * 1000);
            break;
        case 'green':
            duration = getDuration('green');
            if (duration === false) return; // Stop if invalid
            switchLight('green');
            currentLight = 'flashing yellow';
            setTimeout(cycleLights, duration * 1000);
            break;
        case 'flashing yellow':
            if (flashingTimes < 3) {
                switchLight('flashing yellow');
                flashingTimes++;
                setTimeout(cycleLights, 1000);
            } else {
                flashingTimes = 0;
                currentLight = 'red';
                cycleLights();
            }
            break;
    }
};

startButton.addEventListener('click', () => {
    currentLight = 'red';
    cycleLights();
});

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