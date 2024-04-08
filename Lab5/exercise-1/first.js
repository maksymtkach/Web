const bulbs = {
    incandescent: {
        canAdjustBrightness: true,
        temperature: '2700K',
        minBrightness: 0,
        maxBrightness: 100
    },
    led: {
        canAdjustBrightness: true,
        temperature: '5000K', 
        minBrightness: 20,
        maxBrightness: 100
    },
    energySaving: {
        canAdjustBrightness: true,
        temperature: '3500K',
        minBrightness: 10,
        maxBrightness: 100
    },
    halogen: {
        canAdjustBrightness: true,
        temperature: '3000K',
        minBrightness: 0,
        maxBrightness: 100
    }
};

const slider = document.getElementById("slider");
const button = document.getElementById("btn");
const bulbTypeRadios = document.querySelectorAll('input[type="radio"][name="lamp-type"]');
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        turnOffLamp();
    }, 6000);
}

function turnOffLamp() {
    const selectedLamp = document.querySelector('.lamp.light-on');
    if (selectedLamp) {
        selectedLamp.classList.remove('light-on');
        const lightEffect = selectedLamp.querySelector('.light-effect');
        if (lightEffect) {
            lightEffect.style.opacity = 0;
        }
        const bulbType = document.querySelector('input[type="radio"][name="lamp-type"]:checked').value;
        slider.value = bulbs[bulbType].minBrightness;
    }
    resetInactivityTimer();
}

function toggleBulb() {
    const selectedLampType = document.querySelector('input[type="radio"][name="lamp-type"]:checked').value;
    const lampToToggle = document.getElementById(`lamp-${selectedLampType}`);
    const isOn = lampToToggle.classList.contains('light-on');

    if (isOn) {
        turnOffLamp();
    } else {
        lampToToggle.classList.add('light-on');
        const lightEffect = lampToToggle.querySelector('.light-effect');
        if (lightEffect) {
            lightEffect.style.opacity = slider.value / 100;
        }
    }
    resetInactivityTimer();
}

bulbTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        handleBulbSelection.call(radio);
        resetInactivityTimer();
    });
});

button.addEventListener("click", toggleBulb);
slider.addEventListener("input", () => {
    adjustBrightness();
    resetInactivityTimer();
});

function handleBulbSelection() {
    const bulbType = this.value;
    const bulb = bulbs[bulbType];
    displayBulbImage(bulbType);
    console.log(bulb.temperature);
    document.querySelector("#temperature-display").innerText = `Temperature: ${bulb.temperature}`;
    adjustSlider(bulb);
}

function displayBulbImage(bulbType) {
    document.querySelectorAll('.lamp').forEach(lamp => {
        lamp.style.display = 'none';
    });

    const selectedLamp = document.getElementById(`lamp-${bulbType}`);
    selectedLamp.style.display = 'block';
}

function adjustSlider(bulb) {
    if (bulb.canAdjustBrightness) {
        slider.disabled = false;
        slider.min = bulb.minBrightness;
        slider.max = bulb.maxBrightness;
        slider.value = bulb.minBrightness;
    } else {
        slider.disabled = true;
    }
}

function toggleBulb() {
    const selectedLampType = document.querySelector('input[type="radio"][name="lamp-type"]:checked').value;
    const lampToToggle = document.getElementById(`lamp-${selectedLampType}`);
    const isOn = lampToToggle.classList.contains('light-on');

    if (isOn) {
        lampToToggle.classList.remove('light-on');
    } else if (bulbs[selectedLampType].canAdjustBrightness) {
        lampToToggle.classList.add('light-on');
    }
}

function adjustBrightness() {
    const brightness = slider.value;
    const selectedLampType = document.querySelector('input[type="radio"][name="lamp-type"]:checked').value;
    if (bulbs[selectedLampType].canAdjustBrightness) {
        const lightEffect = document.querySelector(`#lamp-${selectedLampType} .light-effect`);
        if (lightEffect) {
            lightEffect.style.opacity = brightness / 100;
        }
    }
}

resetInactivityTimer();

    
