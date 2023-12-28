const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia%2FTokyo';
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data); // データを確認するために表示（不要なら削除可）

        // データを取得した後にグラフを描画する
        drawChart(data);
    })
    .catch(error => {
        console.error('データの取得中にエラーが発生しました:', error);
    });

function drawChart(json) {
    const mydata = {
        labels: json.daily.time,
        datasets: [{
            label: '最高気温',
            data: json.daily.temperature_2m_max,
            borderColor: 'rgb(192, 75, 75)',
        }, {
            label: '最低気温',
            data: json.daily.temperature_2m_min,
            borderColor: 'rgb(75, 75, 192)',
        }]
    }

    new Chart(document.getElementById('stage'), {
        type: 'line',
        data: mydata,
    });
}