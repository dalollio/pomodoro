export interface ConfigurationProps {
    discord_token?: string;
    update_interval?: number;
    working_message?: string;
    working_emoji?: string;
    break_message?: string;
    break_emoji?: string;
}

export function saveConfig(config: ConfigurationProps) {
    localStorage.setItem('config', JSON.stringify(config));
}

export function getConfig(): ConfigurationProps {
    return JSON.parse(localStorage.getItem('config')||'{}');
}
