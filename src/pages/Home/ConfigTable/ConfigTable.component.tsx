import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { Config } from '../types';
import { useStyles } from '../styles';

interface ConfigProps {
  config: Config;
  setConfig: (_: Config) => void;
  onSave: (_: Config) => void;
}

export const ConfigTable: FC<ConfigProps> = ({ config, setConfig, onSave }) => {
  const classes = useStyles();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const [key, subKey] = name.split('.') as [
      keyof Config,
      keyof Config[keyof Config],
    ];
    if (subKey) {
      setConfig({ ...config, [key]: { ...config[key], [subKey]: value } });
    } else {
      setConfig({ ...config, [key]: value });
    }
  };

  return (
    <form onChange={handleChange}>
      <table className={classes.table}>
        <tr>
          <th>
            <Button
              type="button"
              onClick={() => onSave(config)}
              variant="contained"
              color="primary"
            >
              Sauvegarder
            </Button>
          </th>
          <th>Importance (%)</th>
          <th>Taille minimale (%)</th>
          <th>Confiance minimale (%)</th>
        </tr>
        <tr>
          <td style={{ color: 'red', fontWeight: 'bold' }}>Visages</td>
          <td>
            <input
              type="number"
              min="0"
              max="100"
              name="FaceDetails.relativeWeight"
              value={config.FaceDetails?.relativeWeight}
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="100"
              name="FaceDetails.minimalSize"
              step=".1"
              value={config.FaceDetails?.minimalSize}
            />
          </td>
        <td>
            <input
              type="number"
              min="0"
              max="100"
              name="FaceDetails.minimalConfidence"
              value={config.FaceDetails?.minimalConfidence}
            />
          </td>
        </tr>
        <tr>
          <td style={{ color: 'blue', fontWeight: 'bold' }}>Textes</td>
          <td>
            <input
              type="number"
              min="0"
              max="100"
              name="TextDetections.relativeWeight"
              value={config.TextDetections?.relativeWeight}
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="100"
              name="TextDetections.minimalSize"
              step=".1"
              value={config.TextDetections?.minimalSize}
            />
          </td>
        <td>
            <input
              type="number"
              min="0"
              max="100"
              name="TextDetections.minimalConfidence"
              value={config.TextDetections?.minimalConfidence}
            />
          </td>
        </tr>
        <tr>
          <td style={{ color: 'green', fontWeight: 'bold' }}>Autre</td>
          <td>
            <input
              type="number"
              min="0"
              max="100"
              name="Labels.relativeWeight"
              value={config.Labels?.relativeWeight}
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              max="100"
              name="Labels.minimalSize"
              step=".1"
              value={config.Labels?.minimalSize}
            />
          </td>
        <td>
            <input
              type="number"
              min="0"
              max="100"
              name="Labels.minimalConfidence"
              value={config.Labels?.minimalConfidence}
            />
          </td>
        </tr>
      </table>
    </form>
  );
};
