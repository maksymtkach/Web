document.addEventListener('DOMContentLoaded', () => {
    initializeLampSelection(); 
    resetInactivityTimer();
    setupEventListeners();
});

const bulbs = {
    incandescent: { canAdjustBrightness: true, temperature: '2700K', minBrightness: 0, maxBrightness: 100, src: './images/light-lamp.png'},
    led: { canAdjustBrightness: true, temperature: '5000K', minBrightness: 30, maxBrightness: 100, src: './images/led-lamp.png'},
    saving: { canAdjustBrightness: true, temperature: '3500K', minBrightness: 40, maxBrightness: 100, src: './images/saving-lamp.png'},
    halogen: { canAdjustBrightness: true, temperature: '3000K', minBrightness: 50, maxBrightness: 100, src: './images/halogen-lamp.png'}
};
let inactivityTimer;
const bulbTypeRadios = document.querySelectorAll('input[type="radio"][name="lamp-type"]');
const slider = document.querySelector(".slider");
const button = document.querySelector(".toggle-button");
const lampContainer = document.querySelector('.lamp-container .lamp');
const temperatureDisplay = document.querySelector(".temperature-display");

function setupEventListeners() {
    bulbTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => handleBulbSelection(radio.value));
    });

    button.addEventListener("click", toggleBulb);
    slider.addEventListener("input", () => adjustBrightness(lampContainer.classList.contains('light-on')));

    ['click', 'mousemove', 'keypress', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, resetInactivityTimer, false);
    });
}

function initializeLampSelection() {
    const defaultLampType = document.querySelector('input[type="radio"][name="lamp-type"]:checked').value;
    handleBulbSelection(defaultLampType);
}

function handleBulbSelection(selectedBulbType) {
    lampContainer.className = 'lamp ' + selectedBulbType;
    const lampImage = lampContainer.querySelector('#lamp-image');
    lampImage.src = bulbs[selectedBulbType].src;
    displayTemperature(selectedBulbType);
    adjustSlider(bulbs[selectedBulbType]);
}

function toggleBulb() {
    lampContainer.classList.toggle('light-on');
    adjustBrightness(lampContainer.classList.contains('light-on'));
}

function displayTemperature(bulbType) {
    temperatureDisplay.innerText = `Temperature: ${bulbs[bulbType].temperature}`;
}

function adjustSlider(bulb) {
    slider.disabled = !bulb.canAdjustBrightness;
    slider.min = bulb.minBrightness;
    slider.max = bulb.maxBrightness;
    slider.value = bulb.minBrightness;
    adjustBrightness(lampContainer.classList.contains('light-on'));
}

function adjustBrightness(isLightOn) {
    const brightness = isLightOn ? slider.value : 0;
    const lightEffect = lampContainer.querySelector('.light-effect');
    lightEffect.style.opacity = brightness / 100;
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(turnOffLampAutomatically, 10000);
}

function turnOffLampAutomatically() {
    lampContainer.classList.remove('light-on');
    adjustBrightness(false);
}
