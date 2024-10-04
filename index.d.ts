declare module '*.svg' {
  import { FC } from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: FC<SvgProps>;
  export default content;
}

declare module '*.ttf' {
  const value: any;
  export default value;
}

declare module '*.otf' {
  const value: any;
  export default value;
}