module.exports = {
    "name": "hello",
    "description" : "Says Hello",
    "usage" : "hello [arg]",
    // "args" : "true",
    execute(message, args){
        return message.reply(`Hello, ${args[0]}`);
    }
}