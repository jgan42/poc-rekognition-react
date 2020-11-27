import firebase from 'firebase/app';
import React, { FC, useEffect, useState } from 'react';
import { useGetObject } from '../../firebase/useGetObject';
import { useGetList } from '../../firebase/useGetList';
import { useStyles } from './styles';
import { Config, ImageData } from './types';
import { getFocusPoint, getWeighting } from './utils';
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

  console.log('dbConfig, list', config, list);
  const handleSave = (config: Config) => setValue('config', config);

  return (
    <div className={classes.container}>
      <ConfigTable config={config} setConfig={setConfig} onSave={handleSave} />
      <div className={classes.imagesContainer}>
        {list.map((imageData) => {
          const {
            imageUrl,
            FaceDetails = [],
            TextDetections = [],
            Labels = [],
          } = imageData;
          const focusPoint = getFocusPoint(imageData, config);
          return (
            <div key={imageUrl} className={classes.imageContainer}>
              <img src={imageUrl} className={classes.image} alt="" />
              {FaceDetails.filter(
                ({ BoundingBox, Confidence }) =>
                  getWeighting(BoundingBox, config.FaceDetails?.relativeWeight)
                    .size >
                    (config.FaceDetails?.minimalSize || 0) / 100 &&
                  Confidence > (config.FaceDetails?.minimalConfidence || 0),
              ).map((face) => (
                <div
                  key={JSON.stringify(face)}
                  title={JSON.stringify(face)}
                  className={`${classes.boundingBox} red`}
                  style={{
                    top: face.BoundingBox.Top * 100 + '%',
                    left: face.BoundingBox.Left * 100 + '%',
                    height: face.BoundingBox.Height * 100 + '%',
                    width: face.BoundingBox.Width * 100 + '%',
                  }}
                />
              ))}
              {TextDetections.filter(({ ParentId }) => !ParentId)
                .filter(
                  ({ Geometry: { BoundingBox }, Confidence }) =>
                    getWeighting(
                      BoundingBox,
                      config.TextDetections?.relativeWeight,
                    ).size >
                      (config.TextDetections?.minimalSize || 0) / 100 &&
                    Confidence >
                      (config.TextDetections?.minimalConfidence || 0),
                )
                .map((text) => (
                  <div
                    key={text.Id}
                    title={JSON.stringify(text)}
                    className={`${classes.boundingBox} blue`}
                    style={{
                      top: text.Geometry.BoundingBox.Top * 100 + '%',
                      left: text.Geometry.BoundingBox.Left * 100 + '%',
                      height: text.Geometry.BoundingBox.Height * 100 + '%',
                      width: text.Geometry.BoundingBox.Width * 100 + '%',
                    }}
                  />
                ))}
              {Labels.map(({ Name, Instances = [] }) =>
                Instances.filter(
                  ({ BoundingBox, Confidence }) =>
                    getWeighting(BoundingBox, config.Labels?.relativeWeight)
                      .size >
                      (config.Labels?.minimalSize || 0) / 100 &&
                    Confidence > (config.FaceDetails?.minimalConfidence || 0),
                ).map((data) => (
                  <div
                    key={JSON.stringify(data)}
                    title={Name + ' ' + JSON.stringify(data)}
                    className={`${classes.boundingBox} green`}
                    style={{
                      top: data.BoundingBox.Top * 100 + '%',
                      left: data.BoundingBox.Left * 100 + '%',
                      height: data.BoundingBox.Height * 100 + '%',
                      width: data.BoundingBox.Width * 100 + '%',
                    }}
                  />
                )),
              )}
              <div
                style={{
                  left: focusPoint.x * 100 + '%',
                  top: focusPoint.y * 100 + '%',
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
