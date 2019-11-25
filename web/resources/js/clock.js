function setClock() {
    let date = new Date();
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    let text = date.toLocaleString("ru", options);
    let [dateText, timeText] = text.split(",");
    console.log("dateText: " + dateText);
    console.log("timeText: " + timeText);
    document.getElementById('date').innerHTML = dateText;
    document.getElementById('time').innerHTML = timeText;
}