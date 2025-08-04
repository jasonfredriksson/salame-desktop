declare module 'leaflet' {
  export class Icon {
    static Default: {
      prototype: any;
      mergeOptions: (options: any) => void;
    };
  }
}

declare module 'react-leaflet' {
  import { ReactNode } from 'react';
  
  export interface MapContainerProps {
    center: [number, number];
    zoom: number;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export interface TileLayerProps {
    attribution: string;
    url: string;
  }

  export interface MarkerProps {
    position: [number, number];
    children?: ReactNode;
    eventHandlers?: {
      click?: () => void;
    };
  }

  export interface PopupProps {
    children?: ReactNode;
  }

  export interface CircleProps {
    center: [number, number];
    radius: number;
    pathOptions?: {
      fillColor: string;
      fillOpacity: number;
      color: string;
      weight: number;
    };
  }

  export const MapContainer: React.FC<MapContainerProps>;
  export const TileLayer: React.FC<TileLayerProps>;
  export const Marker: React.FC<MarkerProps>;
  export const Popup: React.FC<PopupProps>;
  export const Circle: React.FC<CircleProps>;
}

declare module 'leaflet/dist/images/marker-icon-2x.png';
declare module 'leaflet/dist/images/marker-icon.png';
declare module 'leaflet/dist/images/marker-shadow.png';
