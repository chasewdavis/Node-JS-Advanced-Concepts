// sudo code representing NodeJS event loop

let pendingTimers = [];
let pendingOSTasks = [];
let pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue(){
    // Check One: Any pending setTimeout, setInterval, setImmediate?
    // Check Two: Any pending OS tasks? (Like server listening to port, http requests)
    // Check Three: Any pending long running operations? (Like fs module)
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
}

