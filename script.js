const tabs = document.querySelectorAll('.tab_btn');
const all_content = document.querySelectorAll('.content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab => { tab.classList.remove('active') });
        tab.classList.add('active');

        var line = document.querySelector('.line');
        line.style.width = e.target.offsetWidth + 'px';
        line.style.left = e.target.offsetLeft + 'px';

        all_content.forEach(content => { content.classList.remove('active') });
        all_content[index].classList.add('active');
        
    })
})
const currentTime = document.querySelector("h1"),
content = document.querySelector(".time"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false,
ringtone = new Audio("clock.mp3");

for (let i=12; i>0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value='${i}'>${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for (let i=59; i>0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value='${i}'>${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for (let i=2; i>0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value='${ampm}'>${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}
setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0"  + h : h;
    m = m < 10 ? "0"  + m : m;
    s = s < 10 ? "0"  + s : s;
    
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
    if(alarmTime == `${h}:${m}:${s} ${ampm}`){
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

function setAlarm() {
    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hr") || time.includes("Min") || time.includes("AM/PM")){
        return alert("Please, select  a valid time to set Alarm!");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}
setAlarmBtn.addEventListener("click",setAlarm);

setInterval(() => {
    date = new Date()
    hrTime = date.getHours()
    minTime = date.getMinutes()
    secTime = date.getSeconds()

    hRotation = (30 * hrTime) + (minTime / 2);
    mRotation = (6 * minTime);
    sRotation = (6 * secTime);

    hour.style.transform = `rotate(${hRotation}deg)`
    minute.style.transform = `rotate(${mRotation}deg)`
    second.style.transform = `rotate(${sRotation}deg)`
    clockSound.play();
}, 1000);

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let int = null;

document.getElementById("start-timer").addEventListener("click", () => {
    if(int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000 ";
}); 

function displayTimer() {
    milliseconds += 10;
    if(milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
            if(minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = 
        milliseconds < 10
        ? "00" + milliseconds
        : milliseconds < 100
        ? "0" + milliseconds
        : milliseconds;

    timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;

}
