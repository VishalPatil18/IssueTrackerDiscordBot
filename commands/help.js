const prefix = process.env.PREFIX;

module.exports = {
    "name": "help",
    "description" : "Shows Help",
    "usage" : "help [commandName]",
    // "args" : "true",
    execute(message, args){
        let data = [];

        commands = message.client.commands;
        // console.log(commands);

        if(!args.length){
            data.push(`Here's a list of all the commands: `);
            data.push(commands.map(command => command.name).join(`, `));
            data.push(`\nYou can view the info for a command using ${prefix}help [command_name]`)
            return message.author.send(data, { split: true})
                .then(() => {
                    message.reply("I've DMed you the Info");
                }).catch(error => {
                    console.log(error);
                });
        } else {
            const commandName = args[0].toLowerCase();
            const command = message.client.commands.get(commandName);

            if(!command) {
                return msg.reply("No such command found");
            }

            data.push(`**Name** - ${command.name}`);
            data.push(`**Description** - ${command.description}`);
            data.push(`**Usage** - ${prefix}${command.usage}`);

            return message.channel.send(data, {split: true});
        }
    }
}