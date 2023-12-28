const apiKey = "8322715c9dc8f38717533f00e6471070";
const city = "Tokyo";


// APIを使用して天気情報を取得するためのURL
const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=14&appid=${apiKey}`;


// HTML要素の取得
const weatherContainer = document.getElementById('weather-container');

// 英語から日本語への天気表現の変換を行う関数
function convertWeatherToJapanese(weather, description) {
    switch (weather) {
        case 'Clear':
            return '快晴';
        case 'Clouds':
            if (description === 'few clouds' || description === 'scattered clouds' || description === 'broken clouds') {
                return '晴';
            }
            return '曇り';
        case 'Thunderstorm':
            return '雷雨';
        case 'Rain':
            return '雨';
        case 'Snow':
            return '雪';
        case 'Mist':
            return '霧';
        case 'Smoke':
            return '煙霧';
        case 'Dust':
            return '塵煙霧';
        case 'Sand':
            return '砂塵嵐';
        default:
            return weather;
    }
}

// 天気情報を取得してHTMLに反映する関数
async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 取得したJSONデータをコンソールで確認
        console.log(data);

        // 天気情報の処理
        const weatherData = data.list;

        // 日付と午前午後の天気情報を表示する処理
        for (let i = 0; i < weatherData.length; i += 2) {
            const date = new Date(weatherData[i].dt * 1000).toDateString();
            const morningWeather = convertWeatherToJapanese(weatherData[i].weather[0].main, weatherData[i].weather[0].description);
            const afternoonWeather = convertWeatherToJapanese(weatherData[i + 1].weather[0].main, weatherData[i + 1].weather[0].description);

            const weatherItem = document.createElement('div');
            weatherItem.classList.add('weather-item');

            const dateElement = document.createElement('p');
            dateElement.innerHTML = date;
            weatherItem.appendChild(dateElement);

            const morningElement = document.createElement('p');
            morningElement.innerHTML = `${morningWeather} のち ${afternoonWeather}`;
            weatherItem.appendChild(morningElement);

            weatherContainer.appendChild(weatherItem);
        }
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

// ページが読み込まれた際に天気情報を取得する
window.onload = fetchWeather;