var currentTimeEl = $('#currentDay');
var schedulerList = $('#schedules')
var inputList = []

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
        var inputField = $("<textarea class='span6 col-10 todos' rows='2'></textarea>").data('index', i);
        var saveButton = $("<button class ='btn btn-primary col-1 savebtn'>Save</button>").data('index', i);

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
            inputField.css('background-color', 'lime')
        }
        else if(currentHour == i + 9) {
            inputField.css('background-color', 'red')
        }
        else {
            inputField.css('background-color', 'lightgrey')
        }
        inputList.push(inputField);
        schedulerList.append(row);
        row.append(timeLabel);
        row.append(inputField);
        row.append(saveButton);

        // Give all save-buttons click functions
        
    }
    $(".savebtn").on("click", function() {
        var index = $(this).data("index")
        var chosenInput = inputList[index];
        store = JSON.parse(localStorage.getItem('todos'))
        store[index] = chosenInput.val()
        localStorage.setItem('todos', JSON.stringify(store))
        checkStorage();
    })
}


// Create localstorage array if not already present

function checkStorage() {
    var unparsedstore = localStorage.getItem('todos')
    if(unparsedstore == null) {
        var newstore = ["", "", "", "", "", "", "", "", ""]
        localStorage.setItem('todos', JSON.stringify(newstore))
    }
    else {
        var inputs = $('.todos')
        var store = JSON.parse(localStorage.getItem('todos'))
        for(i = 0; i < inputs.length; i++){
            var currentInput = inputs[i];
            var currentData = store[i];
            if(currentData != null) {
                currentInput.textContent = currentData;
            }
        }
    }
}

setDate();
makeScheduler();
checkStorage();
