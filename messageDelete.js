const { RichEmbed, Util } = require('discord.js');

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
                .setColor('RED')
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setDescription(`Well well well, **${message.author.username}** decided to ghost-ping a user..`)
                .addField('Their Message', `${Util.escapeMarkdown(message.content)}`);
            return message.channel.send(message.author, embed);
        };
    };
};

module.exports = MessageDelete;