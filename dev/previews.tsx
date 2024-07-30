import { Previews } from '@react-buddy/ide-toolbox-next';
import { ReactElement } from 'react';

import { PaletteTree } from './palette';

const ComponentPreviews = (): ReactElement => {
  return (
    <Previews palette={<PaletteTree/>}/>
  );
};

export default ComponentPreviews;