module.exports = {
    "name": "avatar",
    "description" : "Displays message author's avatar",
    "usage" : "avatar",
    // "args" : "true",
    execute(message, args){
        return message.reply(message.author.displayAvatarURL());
    }
}