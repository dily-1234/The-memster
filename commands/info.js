const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Displays info about the currently playing song"),
  async execute({ client, interaction }) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.reply("There are no songs in the queue");

    let bar = queue.createProgressBar({
      queue: false,
      length: 19,
    });

    const song = queue.current;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setThumbnail(song.thumbnail)
          .setDescription(
            `Currently Playing [${song.title}](${song.url})\n\n` + bar
          ),
      ],
    });
  },
};
