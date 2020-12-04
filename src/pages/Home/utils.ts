import { BoundingBox, Config, ImageData, Item } from './types';

const itemMatchesConfig = (
  { type, size, confidence, box }: Item,
  config: Config,
) => {
  const typeConfig = config[type];

  switch (type) {
    case 'FaceDetails':
      return (
        !!typeConfig &&
        size >= typeConfig.minSize &&
        size <= typeConfig.maxSize &&
        confidence >= typeConfig.minConfidence
      );
    case 'TextDetections':
      return (
        !!typeConfig &&
        box.height >= typeConfig.minSize &&
        box.height <= typeConfig.maxSize &&
        confidence >= typeConfig.minConfidence
      );
    case 'Labels':
      return (
        !!typeConfig &&
        size >= typeConfig.minSize &&
        size <= typeConfig.maxSize &&
        confidence >= typeConfig.minConfidence
      );
    default:
      return true;
  }
};

const parseBoundingBox = ({ Width, Height, Left, Top }: BoundingBox) => ({
  center: {
    x: (Left + Width / 2) * 100,
    y: (Top + Height / 2) * 100,
  },
  size: Height * Width * 100,
  box: {
    top: Top * 100,
    left: Left * 100,
    height: Height * 100,
    width: Width * 100,
  },
});

export const parseList = (
  list: ImageData[],
  config: Config,
): { imageUrl: string; items: Item[] }[] =>
  list.map(
    ({ imageUrl, FaceDetails = [], TextDetections = [], Labels = [] }) => ({
      imageUrl,
      items: [
        ...FaceDetails.map(({ Confidence, BoundingBox }) => ({
          type: 'FaceDetails' as const,
          confidence: Confidence,
          ...parseBoundingBox(BoundingBox),
        })),
        ...TextDetections.filter(({ ParentId }) => ParentId === undefined).map(
          ({ Confidence, DetectedText, Geometry: { BoundingBox } }) => ({
            type: 'TextDetections' as const,
            text: DetectedText,
            confidence: Confidence,
            ...parseBoundingBox(BoundingBox),
          }),
        ),
        ...Labels.reduce(
          (acc, { Confidence, Name, Instances = [] }) => [
            ...acc,
            ...Instances.map(({ BoundingBox }) => ({
              type: 'Labels' as const,
              name: Name,
              confidence: Confidence,
              ...parseBoundingBox(BoundingBox),
            })),
          ],
          [] as Item[],
        ),
      ]
        // TODO change to filter
        .map((item, _, parsedList) => ({
          disabled:
            !itemMatchesConfig(item, config) ||
            (item.type === 'Labels' &&
              ((config.Labels?.isFallback &&
                parsedList.some((e) =>
                  ['TextDetections', 'FaceDetails'].includes(e.type),
                )) ||
                config.Labels?.excluded?.includes(item.name))),
          ...item,
        })),
    }),
  );

export const getFocusPoint = (items: Item[], config: Config) => {
  const relativeItems = items
    // TODO useless when filtered
    .filter(({ disabled }) => !disabled)
    .map((item) => {
      const { relativeWeight = 100 } = config[item.type] || {};

      return {
        ...item,
        size: (item.size * relativeWeight) / 100,
      };
    });
  return {
    x:
      relativeItems.reduce(
        (acc, { center, size }) => acc + center.x * size,
        0,
      ) / relativeItems.reduce((acc, { size }) => acc + size, 0),
    y:
      relativeItems.reduce(
        (acc, { center, size }) => acc + center.y * size,
        0,
      ) / relativeItems.reduce((acc, { size }) => acc + size, 0),
  };
};
