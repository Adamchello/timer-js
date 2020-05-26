class Timer {
  constructor() {
      this.hoursNumber = null;
      this.minutesNumber = null;
      this.secondsNumber = null;

      this.hours = null;
      this.minutes = null;
      this.seconds = null;
      this.numberConfirm = null;
      this.timerStart = null;
      this.alarm = null;
      this.time = null;
      this.reset = null;
      this.audio = null;

      this.inputDisaled = false;
      this.timerWorking = false;

      this.savedTime = [];

      this.UiSelectors = {
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds',
        confirm: '[data-confirm]',
        start: '[data-start]',
        reset: '[data-reset]',
        alarm: '[data-alarm]',
        audio: '[data-audio]'
      };
  }

  initializeTimer() {
    this.hours = document.getElementById(this.UiSelectors.hours);
    this.minutes = document.getElementById(this.UiSelectors.minutes);
    this.seconds = document.getElementById(this.UiSelectors.seconds);
    this.numberConfirm = document.querySelector(this.UiSelectors.confirm);
    this.timerStart = document.querySelector(this.UiSelectors.start);
    this.reset = document.querySelector(this.UiSelectors.reset);
    this.alarm = document.querySelector(this.UiSelectors.alarm);
    this.audio = document.querySelector(this.UiSelectors.audio);

    this.addEventListeners();
  }

  addEventListeners() {
    this.numberConfirm.addEventListener('click', () => this.setTime());
    this.timerStart.addEventListener('click', () => this.startTimer());
    this.reset.addEventListener('click', () => this.resetTimer());
    this.alarm.addEventListener('click', () => this.stopAlarm());
  }

  setTime() { 
    this.timerWorking ? clearInterval(this.time) : null;
    this.inputDisaled = !this.inputDisaled;
    this.setInputDisabled(this.inputDisaled);
    document.getElementById('save').classList.toggle('hidden');
    document.getElementById('change').classList.toggle('hidden');
    if(this.timerWorking) this.changeTimerStatus();

    if( this.hours.value < 0 || this.minutes.value < 0 || this.seconds.value < 0){
      window.alert("Please write positive number!");
      return;
    }

    this.hoursNumber = this.hours.value;
    this.minutesNumber = this.minutes.value;
    this.secondsNumber = this.seconds.value;

    this.savedTime = [this.hoursNumber, this.minutesNumber, this.secondsNumber];

    if(this.inputDisaled) this.fixNumbers();
  }

  fixNumbers() {
    if(this.secondsNumber > 59){
      this.minutesNumber = Math.floor(this.minutesNumber) + Math.floor(this.secondsNumber/60);
      this.secondsNumber = this.secondsNumber%60;
    }
    if(this.minutesNumber > 59){
      this.hoursNumber = Math.floor(this.hoursNumber) + Math.floor(this.minutesNumber/60);
      this.minutesNumber = this.minutesNumber%60;
    }
    if(this.hoursNumber > 99){
      this.hoursNumber = 99;
      this.minutesNumber = 59;
      this.secondsNumber = 59;
    }

    this.showNumbers();
  }

  startTimer() {

    this.changeTimerStatus();
    
    if(this.timerWorking){
      this.time = setInterval(() => this.timerMechanincs(), 1000);
    } else {
      clearInterval(this.time);
    }

  }

  alarmMechanics(){
    this.numberConfirm.disabled = true;
    this.timerStart.disabled = true;
    this.reset.disabled = true;

    this.alarm.classList.toggle('hidden');
    this.audio.play();
  }

  stopAlarm(){
    this.audio.pause();
    this.setInputDisabled(false);
    this.numberConfirm.disabled = false;
    this.reset.disabled = false;
    this.inputDisaled = false;
    this.alarm.classList.toggle('hidden');
    document.getElementById('save').classList.toggle('hidden');
    document.getElementById('change').classList.toggle('hidden');
    this.changeTimerStatus();
  }

  timerMechanincs(){
    if( this.hoursNumber == 0 && this.minutesNumber == 0 && this.secondsNumber == 1 || this.secondsNumber == 0 ){
      clearInterval(this.time);
      this.alarmMechanics();
    } else if (this.minutesNumber == 0 && this.secondsNumber == 0) {
      this.hoursNumber--;
      this.minutesNumber = 59;
      this.secondsNumber = 60;
    } else if (this.secondsNumber == 0){
      this.minutesNumber--;
      this.secondsNumber = 60;
    }

    this.secondsNumber--;

    this.showNumbers();
  }

  changeTimerStatus(){
    document.getElementById('start').classList.toggle('hidden');
    document.getElementById('stop').classList.toggle('hidden');
    this.timerWorking = !this.timerWorking;
  }
 
  setInputDisabled(flag) {
    this.hours.disabled = flag;
    this.minutes.disabled = flag;
    this.seconds.disabled = flag;
    this.timerStart.disabled = !flag;
  }

  showNumbers(){
    this.hours.value = this.hoursNumber.toString().length === 1 ?  `0${this.hoursNumber}` : this.hoursNumber;
    this.minutes.value = this.minutesNumber.toString().length === 1 ?  `0${this.minutesNumber}` : this.minutesNumber;
    this.seconds.value = this.secondsNumber.toString().length === 1 ?  `0${this.secondsNumber}` : this.secondsNumber;
  }

  resetTimer() {
    this.hoursNumber = this.savedTime[0];
    this.minutesNumber = this.savedTime[1];
    this.secondsNumber = this.savedTime[2];

    this.showNumbers();
  }

}