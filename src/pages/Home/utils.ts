import { BoundingBox, Config, ImageData } from './types';

export const getWeighting = (
  { Top, Left, Height, Width }: BoundingBox,
  relativeWeight: number = 100,
) => ({
  x: Left + Width / 2,
  y: Top + Height / 2,
  size: (Height * Width * relativeWeight) / 100,
});

export const getFocusPoint = (
  { FaceDetails = [], TextDetections = [], Labels = [] }: ImageData,
  config: Config,
) => {
  const weights = [
    ...FaceDetails.filter(
      ({ Confidence }) =>
        Confidence > (config.FaceDetails?.minimalConfidence || 0),
    )
      .map(({ BoundingBox }) =>
        getWeighting(BoundingBox, config.FaceDetails?.relativeWeight),
      )
      .filter(
        ({ size }) => size > (config.FaceDetails?.minimalSize || 0) / 100,
      ),
    ...TextDetections.filter(
      ({ ParentId, Confidence }) =>
        !ParentId &&
        Confidence > (config.TextDetections?.minimalConfidence || 0),
    )
      .map(({ Geometry: { BoundingBox } }) =>
        getWeighting(BoundingBox, config.TextDetections?.relativeWeight),
      )
      .filter(
        ({ size }) => size > (config.TextDetections?.minimalSize || 0 / 100),
      ),
    ...Labels.reduce(
      (acc, { Instances = [] }) => [
        ...acc,
        ...Instances.filter(
          ({ Confidence }) =>
            Confidence > (config.FaceDetails?.minimalConfidence || 0),
        ).map(({ BoundingBox }) =>
          getWeighting(BoundingBox, config.Labels?.relativeWeight),
        ),
      ],
      [] as ReturnType<typeof getWeighting>[],
    ).filter(({ size }) => size > (config.Labels?.minimalSize || 0) / 100),
  ];

  return {
    x:
      weights.reduce((acc, { x, size }) => acc + x * size, 0) /
      weights.reduce((acc, { size }) => acc + size, 0),
    y:
      weights.reduce((acc, { y, size }) => acc + y * size, 0) /
      weights.reduce((acc, { size }) => acc + size, 0),
  };
};
