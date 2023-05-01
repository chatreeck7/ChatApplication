function formatMessage(username, text){
    var currentDate = new Date();
    // convert to MM DD YYYY HH:MM
    currentDate = currentDate.toLocaleString("en-US");
    
    return {
        username, 
        text,
        time: currentDate
    }
}

module.exports = formatMessage