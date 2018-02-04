var timeInterval = 2000,
    myTimer,
    ajaxRequests = 0;

//override XMLHttpRequest send method to capture the ajax requests
XMLHttpRequest.prototype.oldSend = XMLHttpRequest.prototype.send;
var overriddenSend = function(vData) {
    ajaxRequests++;

    var callback = this.onreadystatechange;
    //intercept the state change
    this.onreadystatechange = function() {
        if (this.readyState == 4) {
            ajaxRequests--;
        }

        if (callback) {
            callback.apply(this, arguments)
        }
    };
    this.oldSend(vData);
};
XMLHttpRequest.prototype.send = overriddenSend;

function callWhenReadyToGo(callback) {
    var maxCheck = 5,
        checkCounter = 0;

    var checkIfLoadingIsDone = function () {

        checkCounter++;
        if (checkCounter === maxCheck) { //check for maximum attempts
            //something wrong with the loading, so just quit
            console.warn('Exceeded maximum wait time to check pending ajax requests');
            clearInterval(myTimer);
            return;
        }

        if (ajaxRequests === 0) { //ajax requests are done
            clearInterval(myTimer);
            callback();
        }
    };

    myTimer = setInterval(checkIfLoadingIsDone, timeInterval);
}