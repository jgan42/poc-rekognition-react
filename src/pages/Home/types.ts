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

export interface Config {
  FaceDetails?: {
    relativeWeight: number;
    minimalSize: number;
    minimalConfidence: number;
  };
  TextDetections?: {
    relativeWeight: number;
    minimalSize: number;
    minimalConfidence: number;
  };
  Labels?: {
    relativeWeight: number;
    minimalSize: number;
    minimalConfidence: number;
  };
}
