const { RichEmbed, Util, Client} = require('discord.js');
const client = new Client();

class MessageDelete {
    constructor(client) {
        this.client = client;
    };

    async run(message) {
        if (message.author.bot) return;
        if (!message.content) return;
        const regex = /<@!?(1|\d{17,19})>/;
        if (message.content.match(regex)) {
            const embed = new RichEmbed()
                .setColor('ed4337')
                .setTitle('Ghost Ping')
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setDescription(`Well, **${message.author.username}** decided to ghost-ping a user..`)
                .addField('Their Message', `\`\`\`${Util.escapeMarkdown(message.content)}\`\`\``);
            return message.channel.send(message.author, embed);
        };
    };
};

module.exports = MessageDelete;