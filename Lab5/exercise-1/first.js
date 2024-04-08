const bulbs = {
    incandescent: {
        canAdjustBrightness: true,
        temperature: '2700K',
        minBrightness: 20,
        maxBrightness: 100
    },
    led: {
        canAdjustBrightness: true,
        temperature: '5000K', 
        minBrightness: 30,
        maxBrightness: 100
    },
    saving: {
        canAdjustBrightness: true,
        temperature: '3500K',
        minBrightness: 40,
        maxBrightness: 100
    },
    halogen: {
        canAdjustBrightness: true,
        temperature: '3000K',
        minBrightness: 50,
        maxBrightness: 100
    }
};

['click', 'mousemove', 'keypress', 'scroll'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
});

const slider = document.querySelector(".slider");
const button = document.querySelector(".toggle-button");
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
    const lampToToggle = document.querySelector(`.lamp.${selectedLampType}`);
    const isOn = lampToToggle.classList.contains('light-on');

    if (isOn) {
        turnOffLamp();
    } else {
        lampToToggle.classList.add('light-on');
        const minBrightness = bulbs[selectedLampType].minBrightness;
        const maxBrightness = bulbs[selectedLampType].maxBrightness;
        const midBrightness = minBrightness + (maxBrightness - minBrightness) * 0.5;
        slider.value = midBrightness; 
        adjustBrightness();
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
slider.addEventListener("input", adjustBrightness);

function handleBulbSelection() {
    const bulbType = this.value;
    displayBulbImage(bulbType);
    displayTemperature(bulbType);
    adjustSlider(bulbs[bulbType]);
}

function displayBulbImage(bulbType) {
    document.querySelectorAll('.lamp').forEach(lamp => {
        lamp.style.display = 'none';
    });
    const selectedLamp = document.querySelector(`.lamp.${bulbType}`);
    if (selectedLamp) {
        selectedLamp.style.display = 'block';
    }
}
function displayTemperature(bulbType) {
    const temperatureText = `Temperature: ${bulbs[bulbType].temperature}`;
    document.querySelector(".temperature-display").innerText = temperatureText;
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

function adjustBrightness() {
    const brightness = slider.value;
    const selectedLampType = document.querySelector('input[type="radio"][name="lamp-type"]:checked').value;
    const lightEffect = document.querySelector(`.lamp.${selectedLampType} .light-effect`);
    if (lightEffect) {
        lightEffect.style.opacity = brightness / 100;
    }
}

resetInactivityTimer();

    
