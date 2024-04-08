const updateClock = () => {
    const now = new Date();
    document.getElementById('hours').textContent = now.getHours().toString().padStart(2, '0');
    document.getElementById('minutes').textContent = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('seconds').textContent = now.getSeconds().toString().padStart(2, '0');
}

setInterval(updateClock, 1000);

let countdownInterval;

const startCountdown = () => {
    clearInterval(countdownInterval);

    const targetValue = document.getElementById('timer-target').value;

    if (!targetValue) {
        alert('Please enter a valid countdown time.');
        return;
    }

    const target = new Date(targetValue);
    const timeLeftDisplay = document.getElementById('time-left');

    const updateCountdown = () => {
        const now = new Date();
        const diff = target - now;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            timeLeftDisplay.textContent = 'Time\'s up!';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const mins = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
        const secs = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

        const timeString = days ? `${days} days ${hours}:${mins}:${secs}` : `${hours}:${mins}:${secs}`;
        timeLeftDisplay.textContent = timeString;
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}


const calculateBirthday = () => {
    const targetValue = document.getElementById('birthday-input').value;

    if (!targetValue) {
        alert('Please enter a valid date.');
        return;
    }

    const birthday = new Date(targetValue);
    const now = new Date();

    if (birthday < now) {
        alert('Please select a future date for your birthday.');
        return;
    }

    const nextBirthday = new Date(birthday);

    nextBirthday.setFullYear(now.getFullYear());
    if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const diff = nextBirthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    alert(`${days} days\n${hours} hours\n${mins} minutes\n${secs} seconds\nUntil your next birthday!`);
}

