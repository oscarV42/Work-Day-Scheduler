// var currentTime = Moment.currentTime()
$(document).ready(function () {
    // capturing current hour
    var currentHour = moment().hours();
    // capturing current date
    var todaysDate = moment().format("dddd, MMMM Do YYYY");
    // logs current hour
    console.log(currentHour);
    //Create Variable with the hours.
    var timeInputs = [
        { time: 9, input: "" },
        { time: 10, input: "" },
        { time: 11, input: "" },
        { time: 12, input: "" },
        { time: 13, input: "" },
        { time: 14, input: "" },
        { time: 15, input: "" },
        { time: 16, input: "" },
        { time: 17, input: "" },
        { time: 18, input: "" },
        { time: 19, input: "" },
        { time: 20, input: "" },
        { time: 21, input: "" },
        { time: 22, input: "" },
    ]

    // gets items from lcocal storage and sets saved 
    // stored input values to the timeInputs input values
    function fetch_local(){
        // capturing localstroage item
        var sched_Arr = JSON.parse(localStorage.getItem('Work-Schedule'));
        // if there is something stored in local storage
        if(sched_Arr != undefined){
            // for as long as our schedule array length
            for(let i = 0; i < sched_Arr.length; i++){
                // timeinputs object input key value = input value at the ith index of parsed local storage item
                timeInputs[i].input = sched_Arr[i].input;
            }
        }
    }

    // Displays today's date on the DOM
    function printTime() {
        $("#currentDay").text(todaysDate);
    }
    // Displays hour rows on the DOM
    function printInputBlocks() {
        // for as long as our timeInput object length
        for (let i = 0; i < timeInputs.length; i++) {
            var inputGroup = $('<div class="input-group mb-3 row">');
            inputGroup.attr('id', timeInputs[i].time);
            var inputGroupPrepend = $('<div class="input-group-prepend">');
            var prependSpan = $('<span class="input-group-text hour">' + timeInputs[i].time + ':00' + '</span>');
            prependSpan.attr('id', timeInputs[i].time);
            inputGroupPrepend.append(prependSpan);
            var inputEl = $('<input type="text" class="form-control" value="' + timeInputs[i].input + '">');
            inputEl.attr('data-hour', timeInputs[i].time)
            inputEl.attr('id', timeInputs[i].time + 'hr');
            inputEl.attr('value', timeInputs[i].input);
            var inputGroupAppend = $('<div class="input-group-append">');
            var appendSpan = $('<span data-time="" class="input-group-text saveBtn"><button id="Btn">💾</button></span>');
            var button = $("#Btn").attr('id', i - 1);
            button.on("click", button_handler);
            inputGroupAppend.append(appendSpan);
            inputGroup.append(inputGroupPrepend).append(inputEl).append(inputGroupAppend);
            $(".container").append(inputGroup);
        }
    }
    function compareTime() {
        // capturing the current hour
        var nowTime = parseInt(moment().format('HH'));
        // logs current hour
        console.log(nowTime)
        //Start from 7:00, to 23:00
        for (time = 9; time <= 22; time++) {
            var timeBlock = parseInt($("#" + time + "hr").attr("data-hour"));
            // if input slot time is less than Current time
            if (timeBlock < nowTime) {
                // adds class past to hour input element
                $("#" + time + "hr").addClass("past");
            // if input slot time is equal to current time
            } else if (timeBlock == nowTime) {
                // adds class present to hour input element
                $("#" + time + "hr").addClass("present");
            // if input slot time is greater than Current time
            } else if (timeBlock > nowTime) {
                // adds class future to hour input element
                $("#" + time + "hr").addClass("future");
            }
        }
    }

    // changes an elements display and class
    function message_display(x){
        // if element is hidden on DOM
        if(x.hasClass('hidden')){
            // display message
            x.attr('style', 'display: inline');
            // set class to visible
            x.attr('class', 'visible');
            // else if visible on DOM
        }else if (x.hasClass('visible')){
            // hide message
            x.attr('style', 'display: none');
            // change class to hidden
            x.attr('class', 'hidden');
        }
    }

    // function handeling clicked button event
    function button_handler(event){
        // capturing the buttons id value (integer 0-16)
        var timeIndex = parseInt($(event.target).attr('id'));
        // caputuring the button time value
        var time = timeInputs[timeIndex].time;
        // vapturing the submitted text in the input time slot
        var input = $("#"+time+"hr").val();
        // Altering the input value at the timeIndex to time slot input value
        timeInputs[timeIndex].input = input;
        // sending the altered timeInput object into local storage
        localStorage.setItem('Work-Schedule', JSON.stringify(timeInputs));
        // if input isn't empty
        if(input !== ""){
            // sending html messahe to be visible for 2 seconds
            message_display($('#message'));
            // set timer
            var timer = 2;
            // Sets interval in variable
            var timerInterval = setInterval(function() {
            // decrementing timer
            timer--;
            // if timer is 0
            if(timer === 0){
                // sends displayed message to be hidden
                message_display($('#message'));
                // Stops execution of action at set interval
                clearInterval(timerInterval);                
            }
            }, 1000);
        }
    }

    fetch_local();
    printTime();
    printInputBlocks();
    compareTime();
});