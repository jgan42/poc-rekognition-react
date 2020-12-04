import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { Config } from '../types';
import { useStyles } from '../styles';

interface ConfigProps {
  config: Config;
  setConfig: (_: Config) => void;
  onSave: (_: Config) => void;
  labels: string[];
}

export const ConfigTable: FC<ConfigProps> = ({
  config,
  labels,
  setConfig,
  onSave,
}) => {
  const classes = useStyles();
  const handleChange = (e: any) => {
    let { type, name, value } = e.target;
    const [key, subKey] = name.split('.') as [
      keyof Config,
      keyof Config[keyof Config],
    ];
    if (type === 'number') {
      value = +value;
    } else if (name === 'Labels.excluded') {
      const excluded = config.Labels?.excluded || [];
      value = excluded.includes(value)
        ? excluded.filter((e) => e !== value)
        : [...excluded, value];
    } else if (type === 'checkbox') {
      value = !!e.target.checked;
    }
    if (subKey) {
      setConfig({ ...config, [key]: { ...config[key], [subKey]: value } });
    } else {
      setConfig({ ...config, [key]: value });
    }
  };

  return (
    <form className={classes.tableContainer} onChange={handleChange}>
      <table className={classes.table}>
        <thead>
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
            <th>Importance %</th>
            <th>Taille min %</th>
            <th>Taille max %</th>
            <th>Confiance min %</th>
            <th>Fallback?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ color: 'red', fontWeight: 'bold' }}>Visages</td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="FaceDetails.relativeWeight"
                value={config.FaceDetails?.relativeWeight || 0}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="FaceDetails.minSize"
                step=".1"
                value={config.FaceDetails?.minSize || 0}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="FaceDetails.maxSize"
                step=".1"
                value={config.FaceDetails?.maxSize || 0}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="FaceDetails.minConfidence"
                value={config.FaceDetails?.minConfidence || 0}
              />
            </td>
            <td />
          </tr>
          <tr>
            <td style={{ color: 'blue', fontWeight: 'bold' }}>Textes</td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="TextDetections.relativeWeight"
                value={config.TextDetections?.relativeWeight || 0}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="TextDetections.minSize"
                step=".1"
                value={config.TextDetections?.minSize || 0}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="TextDetections.maxSize"
                step=".1"
                value={config.TextDetections?.maxSize || 0}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="TextDetections.minConfidence"
                value={config.TextDetections?.minConfidence || 0}
              />
            </td>
            <td />
          </tr>
          <tr>
            <td style={{ color: 'green', fontWeight: 'bold' }}>Autre</td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="Labels.relativeWeight"
                value={config.Labels?.relativeWeight || 0}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="Labels.minSize"
                step=".1"
                value={config.Labels?.minSize || 0}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="Labels.maxSize"
                step=".1"
                value={config.Labels?.maxSize || 0}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                name="Labels.minConfidence"
                value={config.Labels?.minConfidence || 0}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="Labels.isFallback"
                checked={config.Labels?.isFallback}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={classes.labelList}>
        <div>Labels à exclure : </div>
        {labels.map((label) => (
          <span key={label}>
            <input
              type="checkbox"
              name="Labels.excluded"
              checked={config.Labels?.excluded?.includes(label) || false}
              value={label}
            />
            <span>{label}</span>
          </span>
        ))}
      </div>
    </form>
  );
};
