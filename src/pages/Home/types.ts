export interface BoundingBox {
  Height: number;
  Left: number;
  Top: number;
  Width: number;
}

export interface ImageData {
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
    };
    Id: number;
    Type: string;
    ParentId: number;
  }[];
  imageUrl: string;
}

interface TypeConfig {
  relativeWeight: number;
  minSize: number;
  maxSize: number;
  minConfidence: number;
}

export interface Config {
  FaceDetails?: TypeConfig;
  TextDetections?: TypeConfig;
  Labels?: TypeConfig & {
    isFallback: boolean;
    excluded: string[];
  };
}

interface ItemBase {
  disabled?: boolean;
  confidence: number;
  center: {
    x: number;
    y: number;
  };
  size: number;
  box: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
}

interface FaceItem extends ItemBase {
  type: 'FaceDetails';
}

interface TextItem extends ItemBase {
  type: 'TextDetections';
  text: string;
}

interface LabelItem extends ItemBase {
  type: 'Labels';
  name: string;
}

export type Item = FaceItem | TextItem | LabelItem;
