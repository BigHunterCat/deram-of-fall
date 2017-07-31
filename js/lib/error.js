var error = (function () {
    /*
    * message是要显示的消息
    * */
    var getErrorMessage = function (message) {
        var error = new Error();
        error .name = "dream_err.";
        error.message = message;
        return error;
    };

    return {
        getErrorMessage : getErrorMessage
    };
}());