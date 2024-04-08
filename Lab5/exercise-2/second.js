const redLight = document.querySelector('.red-light');
const yellowLight = document.querySelector('.yellow-light');
const greenLight = document.querySelector('.green-light');
const startButton = document.getElementById('start');
const manualSwitchButton = document.getElementById('manual-switch');
const stateDescription = document.getElementById('state-description');

const DEFAULT_RED_DURATION = 5;
const DEFAULT_YELLOW_DURATION = 3;
const DEFAULT_GREEN_DURATION = 7;
const MAX_DURATION = 60;
const FLASHING_DURATION = 1; 
const FLASHING_TIMES = 3; 

const lightConfig = {
    red: {
        backgroundColor: 'red',
        nextLight: 'yellow',
        duration: DEFAULT_RED_DURATION
    },
    yellow: {
        backgroundColor: 'yellow',
        nextLight: 'green',
        duration: DEFAULT_YELLOW_DURATION
    },
    green: {
        backgroundColor: 'green',
        nextLight: 'flashing yellow',
        duration: DEFAULT_GREEN_DURATION
    },
    'flashing yellow': {
        backgroundColor: 'grey',
        nextLight: 'red',
        duration: FLASHING_DURATION
    }
};

let currentLight = 'red';
let flashingTimes = 0;

const switchLight = (nextLight) => {
    redLight.style.backgroundColor = 'grey';
    yellowLight.style.backgroundColor = 'grey';
    greenLight.style.backgroundColor = 'grey';

    redLight.style.backgroundColor = nextLight === 'red' ? 'red' : redLight.style.backgroundColor;
    yellowLight.style.backgroundColor = nextLight === 'yellow' ? 'yellow' : yellowLight.style.backgroundColor;
    greenLight.style.backgroundColor = nextLight === 'green' ? 'green' : greenLight.style.backgroundColor;

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

    if (duration < 0 || duration > MAX_DURATION) {
        alert(`Please enter a valid duration for the ${light} light (0-60 seconds).`);
        return false;
    }
    return duration || lightConfig[light].duration;
};

const handleLightChange = (nextLight) => {
    const duration = getDuration(nextLight);
    if (duration === false) return; 

    switchLight(nextLight);
    currentLight = lightConfig[nextLight].nextLight;

    if (currentLight === 'flashing yellow') {
        flashingTimes = 0;
        setTimeout(handleFlashingYellowLight, duration * 1000);
    } else {
        setTimeout(cycleLights, duration * 1000);
    }
};

const handleFlashingYellowLight = () => {
    if (flashingTimes < FLASHING_TIMES) {
        switchLight('flashing yellow');
        flashingTimes++;
        setTimeout(handleFlashingYellowLight, FLASHING_DURATION * 1000);
    } else {
        currentLight = 'red';
        cycleLights();
    }
};

const cycleLights = () => {
    handleLightChange(currentLight);
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
