function updateClock() {
    const now = new Date();
    document.getElementById('hours').textContent = now.getHours().toString().padStart(2, '0');
    document.getElementById('minutes').textContent = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('seconds').textContent = now.getSeconds().toString().padStart(2, '0');
}

setInterval(updateClock, 1000);

function startCountdown() {
    const target = new Date(document.getElementById('timer-target').value);
    const timeLeftDisplay = document.getElementById('time-left');

    function updateCountdown() {
        const now = new Date();
        const diff = target - now;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            timeLeftDisplay.textContent = 'Time\'s up!';
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const mins = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
        const secs = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

        timeLeftDisplay.textContent = `${hours}:${mins}:${secs}`;
    }

    updateCountdown(); 
    const countdownInterval = setInterval(updateCountdown, 1000);
}

function calculateBirthday() {
    const birthday = new Date(document.getElementById('birthday-input').value);
    const now = new Date();
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

