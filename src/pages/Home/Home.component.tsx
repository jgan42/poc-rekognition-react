import firebase from 'firebase/app';
import React, { FC, useEffect, useState } from 'react';
import { useGetObject } from '../../firebase/useGetObject';
import { useGetList } from '../../firebase/useGetList';
import { useStyles } from './styles';
import { Config, ImageData } from './types';
import { getFocusPoint, parseList } from './utils';
import { ConfigTable } from './ConfigTable';
import { setValue } from '../../firebase/setValue';

export const Home: FC = () => {
  const classes = useStyles();
  const listRef = firebase.database().ref('list');
  const configRef = firebase.database().ref('config');
  const dbConfig = useGetObject<Config>(configRef);
  const list = useGetList<ImageData>(listRef);
  const [config, setConfig] = useState<Config>({});

  useEffect(() => {
    setConfig(dbConfig ? JSON.parse(JSON.stringify(dbConfig)) : {});
  }, [dbConfig]);

  const parsedList = parseList(list, config);
  const labels = parsedList.reduce((acc, { items }) => {
    const newLabels = items.map((item) => item.type === "Labels" && item.name).filter(item => !!item);
    return Array.from(new Set([...acc, ...(newLabels as string[])]));
  }, config.Labels?.excluded || []).sort();

  console.log('dbConfig, list', config, list);
  console.log('parsedList', parsedList);

  const handleSave = (config: Config) => setValue('config', config);

  return (
    <div className={classes.container}>
      <ConfigTable config={config} setConfig={setConfig} onSave={handleSave} labels={labels} />
      <div className={classes.imagesContainer}>
        {parsedList.map(({ imageUrl, items }) => {
          const focusPoint = getFocusPoint(items, config);

          return (
            <div key={imageUrl} className={classes.imageContainer}>
              <img src={imageUrl} className={classes.image} alt="" />
              {items.sort((a, b) => b.size - a.size).map((item) => {
                const { center, disabled, ...rest } = item;
                const color = disabled
                  ? 'grey'
                  : rest.type === 'FaceDetails'
                  ? 'red'
                  : rest.type === 'TextDetections'
                  ? 'blue'
                  : 'green';

                return (
                  <div
                    key={JSON.stringify(rest)}
                    title={JSON.stringify(rest, null, 2)}
                    className={`${classes.boundingBox} ${color}`}
                    style={{
                      top: rest.box.top + '%',
                      left: rest.box.left + '%',
                      height: rest.box.height + '%',
                      width: rest.box.width + '%',
                    }}
                  />
                );
              })}
              <div
                style={{
                  left: focusPoint.x + '%',
                  top: focusPoint.y + '%',
                }}
                className={classes.focusPoint}
              >
                ✕
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
