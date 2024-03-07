# discord-server-utils

Discord Server Utilities is a Node.js package that extends the functionality of the [Discord-Server-Management](https://github.com/your-username/discord-server-management) package. It provides additional utility methods for common tasks in Discord server management, such as sending embedded messages, fetching server stats, and scheduling reminders.

## Installation

You can install the package via npm:

```
npm install discord-server-utils
```

## Usage

First, import the `DiscordServerUtils` class:

```javascript
const DiscordServerUtils = require('discord-server-utils');
```

Then, create an instance of the class by passing in your Discord bot token:

```javascript
const utils = new DiscordServerUtils('your-bot-token');
```

Now you can use the utility methods provided by the class:

```javascript
// Send an embedded message
utils.sendEmbeddedMessage('channel-id', 'Title', 'Description');

// Fetch server stats
const serverStats = await utils.fetchServerStats('guild-id');

// Send role stats
utils.sendRoleStats('channel-id', 'guild-id');

// Schedule a reminder
const job = utils.scheduleReminder(
  'channel-id',
  'Reminder message',
  'schedule-time'
);

// Cancel a scheduled reminder
utils.cancelReminder(job);
```

Make sure to replace `'your-bot-token'`, `'channel-id'`, `'guild-id'`, and `'schedule-time'` with the appropriate values for your use case.

## Methods

### `sendEmbeddedMessage(channelId, title, description)`

Sends an embedded message to the specified channel with the given title and description.

### `fetchServerStats(guildId)`

Fetches the server name and member count for the specified guild (server) and returns an object containing this information.

### `sendRoleStats(channelId, guildId)`

Fetches the roles and their member counts for the specified guild (server) and sends an embedded message with the role statistics to the specified channel.

### `scheduleReminder(channelId, message, scheduleTime)`

Schedules a reminder message to be sent to the specified channel at the given schedule time. Returns a job object that can be used to cancel the scheduled reminder.

### `cancelReminder(job)`

Cancels a previously scheduled reminder by passing the job object returned by `scheduleReminder`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.
