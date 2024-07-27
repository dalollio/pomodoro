import axios from 'axios';
import { getConfig } from './configurations';

const BASE_URL = 'https://discord.com/api/v10/users/@me/settings';
const configurations = getConfig();

export function setCustomStatus(
  statusMessage: string,
  emoji: string,
  status = 'online',
) {
  const headers = {
    authorization:
      configurations.discord_token,
  };
  const payload = {
    custom_status: {
      text: statusMessage,
      expires_at: null,
      emoji_name: emoji,
    },
    activities: [],
    status,
  };
  axios
    .patch(BASE_URL, payload, { headers })
    .catch(err => {
      console.log(err);
    });
}
