var timeInterval = 5000,
    myTimer;

function callWhenReadyToGo(callback) {

    var maxCheck = 5,
        checkCounter = 0;

    var checkIfLoadingIsDone = function () {
        if (checkCounter === maxCheck) {
            //something wrong with the loading, so just quit
            console.warn('Exceeded maximum wait time');
            clearInterval(myTimer);
            return;
        }

        //assumes loadingdiv is the container id, that has the loading gif
        var loadingDiv = document.getElementById('loadingdiv');
        if (loadingDiv) {
            console.log('loading is completed');
            clearInterval(myTimer);
            callback();
        }
        else {
            checkCounter++;
        }

    };

    myTimer = setInterval(checkIfLoadingIsDone, timeInterval);

}
