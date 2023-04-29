function formatMessage(username, text){
    return {
        username, 
        text,
        time: new Date().getTime()
    }
}

module.exports = formatMessage