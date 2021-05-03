var currentTimeEl = $('#currentDay');
var schedulerList = $('#schedules')

// Set date at top of website

function setDate()  {
    var today = moment().format('dddd, MMM Do');
    currentTimeEl.text(today);
}

// Make function to make all the text-fields
function makeScheduler () {
    for(i = 0; i < 9; i++){
        var row = $("<div></div>").addClass("row");
        var timeLabel = $("<span></span>").addClass("col-1 span6");
        var inputField = $("<textarea class='span6 col-10' rows='2' required></textarea>").attr('index', i);
        var saveButton = $("<button class ='btn btn-primary col-1'>Save</button>").attr('index', i);

        if(i <= 2){
            timeLabel.text((i + 9) + "AM")
        } else if (i == 3) {
            timeLabel.text("12PM")
        }
        else {
            timeLabel.text((i - 3) + "PM")
        }
        var currentHour = moment().toObject().hours;
        if(currentHour < i + 9) {
            inputField.css('background-color', 'green')
        }
        else if(currentHour == i + 9) {
            inputField.css('background-color', 'red')
        }
        else {
            inputField.css('background-color', 'gray')
        }
        schedulerList.append(row);
        row.append(timeLabel);
        row.append(inputField);
        row.append(saveButton);

    }
}
setDate();
makeScheduler();