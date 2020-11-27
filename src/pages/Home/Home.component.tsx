import React, { FC } from 'react';
import firebase from 'firebase/app';
import { useGetObject } from '../../firebase/useGetObject';
import { useGetList } from '../../firebase/useGetList';
import { useStyles } from './styles';

interface BoundingBox {
  Height: number;
  Left: number;
  Top: number;
  Width: number;
}

interface ImageData {
  id: string;
  FaceDetails?: {
    BoundingBox: BoundingBox;
    Confidence: number;
    Quality: {
      Brightness: number;
      Sharpness: number;
    };
  }[];
  Labels: {
    Confidence: number;
    Name: string;
    Instances?: {
      Confidence: number;
      BoundingBox: BoundingBox;
    }[];
  }[];
  TextDetections?: {
    Confidence: number;
    DetectedText: string;
    Geometry: {
      BoundingBox: BoundingBox;
      Polygon: { X: number; Y: number }[];
    };
    Id: number;
    Type: string;
    ParentId: number;
  }[];
  imageUrl: string;
}

interface Config {}

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const classes = useStyles();
  const listRef = firebase.database().ref('list');
  const configRef = firebase.database().ref('config');
  const list = useGetList<ImageData>(listRef);
  const config = useGetObject<Config>(configRef);
  console.log('config, list', config, list);

  return (
    <div className={classes.container}>
      <div className={classes.imagesContainer}>
        {list.map(({ imageUrl, FaceDetails, TextDetections, Labels }) => (
          <div key={imageUrl} className={classes.imageContainer}>
            <img src={imageUrl} className={classes.image} alt="" />
            {FaceDetails?.map((face) => (
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
            {TextDetections?.filter(({ ParentId }) => !ParentId).map((text) => (
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
            {Labels?.map((label) =>
              label.Instances?.map((data) => (
                <div
                  key={JSON.stringify(data)}
                  title={label.Name + ' ' + JSON.stringify(data)}
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
          </div>
        ))}
      </div>
    </div>
  );
};
