const ServerManagementBot = require('discord-server-management');
const { MessageEmbed } = require('discord.js');
const schedule = require('node-schedule');

class DiscordServerUtils extends ServerManagementBot {
  constructor(token) {
    super(token);
  }

  async sendEmbeddedMessage(channelId, title, description) {
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor('RANDOM');

    try {
      await this.discord.sendMessageToChannel(channelId, { embed });
      console.log(`Embedded message sent to channel ${channelId}`);
    } catch (error) {
      console.error('Failed to send embedded message:', error);
    }
  }

  async fetchServerStats(guildId) {
    try {
      const guildInfo = await this.discord.getGuild(guildId);
      return {
        name: guildInfo.name,
        memberCount: guildInfo.member_count,
      };
    } catch (error) {
      console.error('Failed to fetch server stats:', error);
      return null;
    }
  }

  async sendRoleStats(channelId, guildId) {
    try {
      const guildInfo = await this.discord.getGuild(guildId);
      const roles = guildInfo.roles;

      const stats = roles.map(
        (role) => `${role.name}: ${role.members.length} members`
      );

      const embed = new MessageEmbed()
        .setTitle('Role Statistics')
        .setDescription(stats.join('\n'))
        .setColor('RANDOM');

      await this.discord.sendMessageToChannel(channelId, { embed });
      console.log(`Role stats sent to channel ${channelId}`);
    } catch (error) {
      console.error('Failed to fetch role stats:', error);
    }
  }

  scheduleReminder(channelId, message, scheduleTime) {
    const job = schedule.scheduleJob(scheduleTime, async () => {
      try {
        await this.discord.sendMessageToChannel(channelId, message);
        console.log(`Scheduled reminder sent to channel ${channelId}`);
      } catch (error) {
        console.error('Failed to send scheduled reminder:', error);
      }
    });

    return job;
  }

  cancelReminder(job) {
    if (job) {
      job.cancel();
      console.log('Scheduled reminder canceled');
    }
  }
}

module.exports = DiscordServerUtils;
