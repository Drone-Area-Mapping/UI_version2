let Start;
let Stop;
let Exp;
let TimerExp;
let downloadTimer;
let Width;

let NDVI = false;
let FLIR = false;
let RGB = false;

let Red = '#FF0000'; //🔴
let Blue = '#a46bf0'; //🔵
let Grey = '#808080'; //⚫
let Green = '#05FF00'; //🟢
let Trans = ''; //⚪
let Orange = '#ee9b00';
let LightBlue = '#0a9396';
let LightRed = '#9b2226';

function mouseDownStart() {

    if (Exp) {
        Start = false;

        colorButtons(Grey, Trans, Blue, Grey, Trans);
        console.log("cannot start beceause exporting");
    }
    else if (Stop) {
        Start = true;
        Exp = false;
        Stop = false;

        colorButtons(Green, Trans, Grey, Trans, Grey);
        console.log("start program after stopping");
        widthProgress(0);


        TimerExp = setTimeout(function () {
            Exp = false;
            Start = false;
            Stop = false;

            colorButtons(Trans, Trans, Trans, Trans, Trans);
            console.log("timer start ended");
            widthProgress(100);

        }, 10000);

    }
    else {
        Start = true;

        colorButtons(Green, Trans, Grey, Trans, Grey);
        console.log("Programm started");
        widthProgress(0);


        TimerExp = setTimeout(function () {
            Exp = false;
            Start = false;
            Stop = false;

            colorButtons(Trans, Trans, Trans, Trans, Trans);
            console.log("done exporting/timer start ended");
            widthProgress(100);

        }, 10000);
    }

}

function mouseDownStop() {
    Start = false;
    Exp = false;
    Stop = true;

    colorButtons(Trans, Trans, Trans, Trans, Trans);
    clearTimeout(TimerExp);
    clearInterval(downloadTimer);
    widthProgress(100);


    console.log("Timer stoped/exporting stoped/program stoped");
}

function mouseDownExport() {

    if (Stop) {
        Exp = true;
        Stop = false;
        Start = false;

        colorButtons(Grey, Trans, Blue, Grey, Trans);

        console.log("Start exporting after stopping")
        widthProgress(0);


        TimerExp = setTimeout(function () {
            Exp = false;
            Start = false;
            Stop = false;

            colorButtons(Trans, Trans, Trans, Trans, Trans);

            console.log("done exporting/timer start ended");
            widthProgress(100);

        }, 10000);
    }
    else if (Start) {
        Exp = false;
        Stop = false;

        colorButtons(Green, Trans, Grey, Trans, Grey);
        console.log("cannot start while exporting");
    }
    else {
        Exp = true;
        Stop = false;
        Start = false;

        colorButtons(Grey, Trans, Blue, Grey, Trans);
        console.log("start exporting");
        widthProgress(0)


        TimerExp = setTimeout(function () {
            Exp = false;
            Start = false;
            Stop = false;

            colorButtons(Trans, Trans, Trans, Trans, Trans);
            console.log("done exporting/timer start ended");
            widthProgress(100);

        }, 10000);
    }

}

function widthProgress(startWidth) {
    if (startWidth == 0) {

        let timeleft = 9;
        downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
            }
            timeleft -= 1;
            let width = 100 - timeleft;
            $('.progress').css('width', `${width}%`);
            $('#progress-number').html(`${width}%`);
            $('#progress-number').css("left", `${width}%`);
        }, 1000);
    }
    else if (startWidth == 100) {
        let width = "0%";
        $('.progress').css('width', width);
        $('#progress-number').html(width);
        $('#progress-number').css("left", width);

    }
}

function colorButtons(startColor, stopColor, exportColor, startColorBorder, exportColorBorder) {
    $('#processing-start-button').css('background-color', startColor);
    $('#processing-stop-button').css('background-color', stopColor);
    $('#processing-export-button').css('background-color', exportColor);

    $('#processing-start-button').css('border-color', startColorBorder);
    $('#processing-export-button').css('border-color', exportColorBorder);
}

//checkboxes

function RGBFunction() {

    RGB = true;
    NDVI = false;
    FLIR = false;
    console.log(RGB, NDVI, FLIR);
    colorCheckBox(Orange, Trans, Trans);

}

function NDVIFunction() {

    NDVI = true;
    RGB = false;
    FLIR = false;
    console.log(RGB, NDVI, FLIR);
    colorCheckBox(Trans, LightBlue, Trans);

}

function infraFunction() {

    FLIR = true;
    NDVI = false;
    RGB = false;
    console.log(RGB, NDVI, FLIR);
    colorCheckBox(Trans, Trans, LightRed);

}

function colorCheckBox(RGBColor, NDVIColor, infraColor) {

    $('#RGB-box').css('background-color', RGBColor);
    $('#NDVI-box').css('background-color', NDVIColor);
    $('#infra-box').css('background-color', infraColor);

}

$(document).ready(function () {
    $('#exportPath').change(v => {
        console.log(v.target.value || 'Not a valid value! 💩');
    });

    $('#importPath').change(v => {
        console.log(v.target.value || 'Not a valid value! 💩');
    });
})


