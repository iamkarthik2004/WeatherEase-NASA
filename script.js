const form = document.getElementById('weatherForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const lat = document.getElementById('lat').value;
  const lon = document.getElementById('lon').value;
  const date = document.getElementById('date').value.replaceAll('-', '');

  resultDiv.innerHTML = `<p>Checking weather for your event...</p>`;

  const apiUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR,WS10M,RH2M&start=${date}&end=${date}&latitude=${lat}&longitude=${lon}&community=RE&format=JSON`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const weather = data?.properties?.parameter;

    if (!weather) throw new Error('No data available');

    const temperature = weather.T2M[date];
    const rainfall = weather.PRECTOTCORR[date];
    const wind = weather.WS10M[date];
    const humidity = weather.RH2M[date];

    let comfort = "Comfortable 😌";
    let message = "It looks like the weather will be fine for your event.";

    if (temperature > 35) {
      comfort = "Very Hot 🔥";
      message = "It will be very hot. Stay hydrated!";
    } else if (temperature < 10) {
      comfort = "Very Cold ❄️";
      message = "It will be very cold. Wear warm clothes!";
    } else if (humidity > 80 && temperature > 30) {
      comfort = "Very Uncomfortable 😓";
      message = "High humidity and temperature. It may feel sticky and tiring.";
    } else if (rainfall > 5) {
      comfort = "Very Wet 🌧️";
      message = "It might rain a lot. Carry an umbrella or plan indoor activities.";
    } else if (wind > 25) {
      comfort = "Very Windy 💨";
      message = "Strong winds expected. Be careful outdoors!";
    }

    resultDiv.innerHTML = `
      <h2>🌍 Weather Summary</h2>
      <p>🌡️ Temperature: <b>${temperature} °C</b></p>
      <p>💧 Rainfall: <b>${rainfall} mm</b></p>
      <p>💨 Wind Speed: <b>${wind} m/s</b></p>
      <p>💦 Humidity: <b>${humidity}%</b></p>
      <h3>Comfort Level: ${comfort}</h3>
      <p>${message}</p>
    `;
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<p>Failed to fetch NASA data. Please check your inputs and try again.</p>`;
  }
});
