import React from 'react';
import Input from '../../components/Shared/Input';
import './styles.css';
import {
  saveConfig,
  ConfigurationProps,
  getConfig,
} from '../../services/configurations';

const Configuration: React.FC = () => {
  const [configuration, setConfiguration] =
    React.useState<ConfigurationProps>();

  const loadConfiguration = () => {
    setConfiguration(getConfig);
  };

  const changeFormValue = (key: keyof ConfigurationProps, value: any) => {
    const configs = { ...configuration, [key]: value };
    setConfiguration({ ...configs });
  };

  React.useEffect(() => {
    loadConfiguration();
  }, []);

  return (
    <div>
      <h3>Config</h3>
      <div className="config-list">
        <div className="config-item">
          <label htmlFor="Discord Token">Discord Token</label>
          <Input
            value={configuration?.discord_token || ''}
            handleChange={text =>
              changeFormValue('discord_token', text.target.value)
            }
            inputType="text"
            placeholder="Discord Token"
          />
        </div>
        <div className="config-row">
          <div className="config-item stretch">
            <label>Working Message</label>
            <Input
              value={configuration?.working_message || ''}
              handleChange={text =>
                changeFormValue('working_message', text.target.value)
              }
              inputType="text"
              placeholder="Message"
            />
          </div>
          <div className="config-item stretch">
            <label>Working Emoji</label>
            <Input
              value={configuration?.working_emoji || ''}
              handleChange={text =>
                changeFormValue('working_emoji', text.target.value)
              }
              inputType="text"
              placeholder="Emoji"
            />
          </div>
        </div>
        <div className="config-row">
          <div className="config-item stretch">
            <label>Break Message</label>
            <Input
              value={configuration?.break_message || ''}
              handleChange={text =>
                changeFormValue('break_message', text.target.value)
              }
              inputType="text"
              placeholder="Message"
            />
          </div>
          <div className="config-item stretch">
            <label>Break Emoji</label>
            <Input
              value={configuration?.break_emoji || ''}
              handleChange={text =>
                changeFormValue('break_emoji', text.target.value)
              }
              inputType="text"
              placeholder="Emoji"
            />
          </div>
        </div>
        <div className="config-row">
          <div className="config-item stretch">
            <label>Interval Timer (sec.)</label>
            <Input
              value={String(configuration?.update_interval || '')}
              handleChange={text =>
                changeFormValue('update_interval', text.target.value)
              }
              inputType="number"
              placeholder="Timer in seconds"
            />
          </div>
        </div>
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <span
            onClick={() => {
              if (configuration) {
                saveConfig(configuration);
              }
            }}
            className="button"
            style={{ width: '130px' }}>
            Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
