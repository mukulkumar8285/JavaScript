let searchButton = document.getElementById("option").addEventListener("click", fetchData);
let option2 = document.getElementById("option2").addEventListener("click" , fetchData2);
let para = document.getElementById("para");
const array = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NFLX', 'NVDA', 'BABA', 'INTC'];
const API_key = "THP9E3PF8GE7A5QC";
let p = document.createElement("p");
let p2 = document.createElement("p");
let p3 = document.createElement("p");


function fetchOptionArray() {

    const select = document.getElementById("select");

    array.forEach(symbol => {
        const option = document.createElement("option");
        option.value = symbol;
        option.text = symbol;
        select.appendChild(option);
    });
}

fetchOptionArray();


async function fetchData(e) {
    e.preventDefault()
    let input = document.getElementById("input").value;
    let selectedStock = document.getElementById("select").value;
    let divData = document.getElementById("divData");
    let TableRow = document.getElementById("TableRow");

    let stockSymbol = input ? input : selectedStock;

    if (!stockSymbol) {
        para.innerHTML = "Please select or enter a stock symbol.";
        return;
    }
    try {
        let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${API_key}`);
        let data = await response.json();
        console.log(data);

        if (data["Time Series (Daily)"]) {
            const timeSeries = data["Time Series (Daily)"];
            const labels = Object.keys(timeSeries).reverse();
            const prices = labels.map(time => timeSeries[time]["1. open"]).reverse();
            const close = labels.map(time => timeSeries[time]["4. close"]).reverse();
            const volume = labels.map(time => timeSeries[time]["5. volume"]).reverse();
            let closeValue = (close[0] - close[1]).toFixed(2);
            console.log("close ", closeValue);
            let row = document.createElement("tr");
            row.innerHTML = `<td>${stockSymbol}</td><td>${prices[0]}</td><td>${closeValue}</td><td>${volume[0]}</td>`; 
            TableRow.appendChild(row);

            p.innerHTML = `Latest Price: $${close[0]}`;
            p3.innerHTML = `Change: $ ${closeValue}`; 
            p2.innerHTML = `Volume: ${volume[0]}`;
            divData.appendChild(p);
            divData.appendChild(p2);
            divData.appendChild(p3);

            console.log("price", prices);
            console.log("volume", volume);
            updateChart(labels, prices);

            para.innerHTML = `Data fetched for ${stockSymbol}`;
        } else {
            para.innerHTML = data.Information || "No data available.";
            console.log("para", para);
        }
    } catch (error) {
        para.innerHTML = "An error occurred while fetching data.";
        console.log("Error:", error);
    }
}

async function fetchData2(e) {
    e.preventDefault()
    let input = document.getElementById("input").value;
    let selectedStock = document.getElementById("select").value;
    let divData = document.getElementById("divData");
    let TableRow = document.getElementById("TableRow");

    let stockSymbol = input ? input : selectedStock;

    if (!stockSymbol) {
        para.innerHTML = "Please select or enter a stock symbol.";
        return;
    }
    try {
        let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${API_key}`);
        let data = await response.json();
        console.log(data);

        if (data["Time Series (Daily)"]) {
            const timeSeries = data["Time Series (Daily)"];
            const labels = Object.keys(timeSeries).reverse();
            const prices = labels.map(time => timeSeries[time]["1. open"]).reverse();
            const close = labels.map(time => timeSeries[time]["4. close"]).reverse();
            const volume = labels.map(time => timeSeries[time]["5. volume"]).reverse();
            let closeValue = (close[0] - close[1]).toFixed(2);
            console.log("close ", closeValue);
            let row = document.createElement("tr");
            row.innerHTML = `<td>${stockSymbol}</td><td>${prices[0]}</td><td>${closeValue}</td><td>${volume[0]}</td>`; 
            TableRow.appendChild(row);

            p.innerHTML = `Close Value: $${close[0]}`;
            p3.innerHTML = `Change: $ ${closeValue}`; 
            p2.innerHTML = `Volume: ${volume[0]}`;
            divData.appendChild(p);
            divData.appendChild(p2);
            divData.appendChild(p3);

            console.log("price", prices);
            console.log("volume", volume);
            updateChart(labels, prices);

            para.innerHTML = `Data fetched for ${stockSymbol}`;
        } else {
            para.innerHTML = data.Information || "No data available.";
            console.log("para", para);
        }
    } catch (error) {
        para.innerHTML = "An error occurred while fetching data.";
        console.log("Error:", error);
    }
}


let myChart;
function updateChart(labels, data) {
    const ctx = document.getElementById("myChart").getContext("2d");
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            }
        }
    });
}
