var requestOptions = {
  method: 'GET',
};

let list;
let chart;


async function onSubmit(e) {
  list.innerHTML = '';
  e.preventDefault();
  const place = document.getElementById('place').value;
  const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&apiKey=ddd9a592bdda43099d3e370f85854e5c`, requestOptions)
  const data = await response.json()
  placesToShow(data.features)
  const firstPlaceLat = data.features[0].properties.lat;
  const firstPlaceLong = data.features[0].properties.lon;
  await loadPlaceData(firstPlaceLat, firstPlaceLong)
}

function placesToShow(item) {
  item.forEach(element => {
    const option = document.createElement('option');
    option.value = [element.properties.lat, element.properties.lon];
    option.innerHTML = element.properties.formatted;
    document.getElementById('places').appendChild(option);
  })
}

function loadChart(temperature, time) {
  const ctx = document.getElementById('myChart');
  chart = new Chart(ctx, {
    type: 'polarArea',
    color: 'red',
    data: {
      labels: formatDate(time),
      datasets: [{
        label: 'Celsius',
        data: temperature,
        borderWidth: 1,
        borderColor: 'black',
        hoverBackgroundColor: '#c1c1c1',
        backgroundColor: '#dc5454'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function formatDate(dates) {
  const formated = dates.map(date => {
    const dateToFormat = new Date(date);
    return dateToFormat.toLocaleDateString() + ', ' + dateToFormat.toLocaleTimeString();
  })
  return formated;
}

document.addEventListener("DOMContentLoaded", function () {
  list = document.getElementById('places');
  document.querySelector('form').addEventListener('submit', onSubmit);
  document.getElementById('places').addEventListener('change', async function (item) {
    const latitude = item.target.value.split(',')[0];
    const longitude = item.target.value.split(',')[1];
    loadPlaceData(latitude, longitude)
  })
});

async function loadPlaceData(lat, long) {
  if (chart) chart.destroy();
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`)
  const weather = await response.json();
  loadChart(weather.hourly.temperature_2m.slice(40, 70), weather.hourly.time.slice(40, 70))
}
