export const loadMap = function (position) {
  const map = L.map('map').setView(
    [position.coords.latitude, position.coords.longitude],
    13
  );

  L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([position.coords.latitude, position.coords.longitude])
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
};
