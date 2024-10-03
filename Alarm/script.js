const currentTimeElement = document.getElementById('current-time');
const alarmDateInput = document.getElementById('alarm-date');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmBtn = document.getElementById('set-alarm-btn');
const alarmStatus = document.getElementById('alarm-status');

let alarmDateTime = null;
let audio = null;  

 
function updateCurrentTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
 
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    
  
    if (alarmDateTime && now >= alarmDateTime) {
        playAlarm();
    }
}

 
function playAlarm() {
    if (audio) {
        audio.pause();  
        audio.currentTime = 0;  
    }

    alarmStatus.textContent = "Alarm is ringing!";
    console.log("Playing alarm sound...");  
    audio = new Audio('mixkit-sound-alert-in-hall-1006.wav');  
    audio.play().catch(error => {
        console.error("Error playing audio:", error);  
    });

    setTimeout(() => {
        alarmStatus.textContent = "";
        if (audio) {
            audio.pause();  
            audio.currentTime = 0; 
        }
        alarmDateTime = null;  
    }, 10000); 
}

 
setAlarmBtn.addEventListener('click', () => {
    const selectedDate = new Date(`${alarmDateInput.value}T${alarmTimeInput.value}`);
    alarmDateTime = selectedDate;
    alarmStatus.textContent = `Alarm set for ${selectedDate.toLocaleString()}`;
});

 
setInterval(updateCurrentTime, 1000);
