'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');

const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const mapID = document.querySelector('#map');
let workout = [];
const loadMap = function (position) {
  const map = L.map('map').setView(
    [position.coords.latitude, position.coords.longitude],
    13
  );

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // L.marker([position.coords.latitude, position.coords.longitude])
  //   .addTo(map)
  //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  //   .openPopup();

  map.on('click', showForm);
};
const showForm = function (event) {
  form.classList.remove('hidden');
};
const clearForm = function () {
  inputDistance.value = '';
  inputDuration.value = '';
  inputCadence.value = '';
  inputElevation.value = '';
};
const storeWorkout = () => {
  const distance = inputDistance.value;
  const duration = inputDuration.value;

  const cadence = inputCadence.value;
  const obj = { distance, duration, cadence };
  workout.push(obj);
  console.log(workout);
  setData();
};

const hideForm = function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    storeWorkout();
    form.classList.add('hidden');
    clearForm();
  }
};

form.addEventListener('keypress', hideForm);
const toggleField = function (event) {
  console.log(event.target);

  if (event.target.value === 'running') {
    document.querySelector('.cadence').classList.remove('form__row--hidden');
    document.querySelector('.elevation').classList.add('form__row--hidden');
  }
  if (event.target.value === 'cycling') {
    document.querySelector('.cadence').classList.add('form__row--hidden');
    document.querySelector('.elevation').classList.remove('form__row--hidden');
  }
};
inputType.addEventListener('change', toggleField);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(loadMap, function () {
    alert('your location could not be found');
  });
}

const setData = function () {
  localStorage.setItem('workout', JSON.stringify(workout));
};

const getData = function () {
  localStorage.getItem('workout');
};

const showWorkout = () => {
  let running = `<li class="workout workout--running" data-id="1234567890">
  <h2 class="workout__title">Running on April 14</h2>
  <div class="workout__details">
    <span class="workout__icon">🏃‍♂️</span>
    <span class="workout__value">5.2</span>
    <span class="workout__unit">km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⏱</span>
    <span class="workout__value">24</span>
    <span class="workout__unit">min</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">4.6</span>
    <span class="workout__unit">min/km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">🦶🏼</span>
    <span class="workout__value">178</span>
    <span class="workout__unit">spm</span>
  </div>
</li>`;

  let cycling = `<li class="workout workout--cycling" data-id="1234567891">
  <h2 class="workout__title">Cycling on April 5</h2>
  <div class="workout__details">
    <span class="workout__icon">🚴‍♀️</span>
    <span class="workout__value">27</span>
    <span class="workout__unit">km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⏱</span>
    <span class="workout__value">95</span>
    <span class="workout__unit">min</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">16</span>
    <span class="workout__unit">km/h</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⛰</span>
    <span class="workout__value">223</span>
    <span class="workout__unit">m</span>
  </div>
</li>`;
  const runningData = form.insertAdjacentHTML('afterend', running);
  form.insertAdjacentHTML('afterend', cycling);
};
showWorkout();
