declare module 'react-avatar-editor' {
  import * as React from 'react';

  export interface AvatarEditorProps {
    image: string | File;
    width: number;
    height: number;
    border?: number;
    borderRadius?: number;
    color?: [number, number, number, number]; // RGBA
    scale?: number;
    rotate?: number;
    className?: string;
    style?: React.CSSProperties;
  }

  export default class AvatarEditor extends React.Component<AvatarEditorProps> {
    getImage(): HTMLCanvasElement;
    getImageScaledToCanvas(): HTMLCanvasElement;
  }
}
