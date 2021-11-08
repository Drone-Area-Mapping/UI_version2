let startProgram = false, timer;

const batteryPercentage = {
    value: 10,
    total: 100
};
const storage = {
    value: 40,
    total: 100
};
const imagesTaken = {
    value: 100,
    total: 300
};

let batteryChart, storageChart, imagesChart;

$(document).ready(function() {
    renderCharts(0, 0, 0);
    $('.ldBar-label').css('text-shadow', 'none');
    
    setTimeout(function() { 
        batteryChart.set(batteryPercentage.value);
        storageChart.set(storage.value);
        imagesChart.set(imagesTaken.value);
        $(':root').css('--fill-battery', correctChart(batteryPercentage.value, 'battery', batteryPercentage.total));
        $(':root').css('--fill-storage', correctChart(storage.value, 'storage', storage.total));
        $(':root').css('--fill-images', correctChart(imagesTaken.value, 'images', imagesTaken.total));
    }, 200)

    $('#slider').val(localStorage.getItem('captureInterval') || 50);
    $('#slider').on('input', e => { 
        const min = e.target.min;
        const max = e.target.max;
        const val = e.target.value;
        
        localStorage.setItem('captureInterval', e.target.value);

        $(e.target).css({
          'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
        });

        var newVal = Number(((val - min) * 100) / (max - min));
        
        $('#img-val').html(val);
        $('#img-val').css('left', `calc(${newVal}% + (${12.5 - newVal * 0.2}px))`);

      }).trigger('input');
});

const renderCharts = function(batteryValue, storageValue, imagesValue) {
    batteryChart = drawChart(batteryValue, 'battery', batteryPercentage.total);
    storageChart = drawChart(storageValue, 'storage', storage.total);
    imagesChart = drawChart(imagesValue, 'images', imagesTaken.total);
}

const correctChart = function(value, type, totalValue) {
    let dividedValue = (totalValue / 3);

    if (type == 'battery' ) {
        if (value < dividedValue) return '#F15454'; // 🔴
        else if (value >= dividedValue && value <= dividedValue * 2) return '#FFF172'; // 🟡)
        else return '#0AFF6C'; // 🟢
    } else {
        if (value > dividedValue * 2) return '#F15454'; // 🔴
        else if (value >= dividedValue && value <= dividedValue * 2) return '#FFF172'; // 🟡)
        else return '#0AFF6C'; // 🟢
    }
}

const drawChart = function(value, type, total) {
    return new ldBar(`.${type}-chart`, {
        "stroke": correctChart(value, type, total),
        "stroke-width": 6,
        "value": value
    });
}

const start = function() {
    if (!startProgram) {
        console.log(`Heya we're recording 🎥 \n\nThe drone 🔋 is at ${batteryPercentage.value}% and there is ${storage.total - storage.value} gb of 📂 left!`)
        startProgram = true;
        $('#start-btn').css('background-color', '#05FF00');
        timer = setTimeout(() => {
            startProgram = false;
            clearTimeout(timer);
            $('#start-btn').css('background-color', '');
        }, 3000);
    }
}

const stop = function() {
    if (startProgram) {
        startProgram = false;
        clearTimeout(timer);
        $('#start-btn').css('background-color', '');
    }
}