import {
  Category,
  Component,
  Palette,
  Variant,
} from '@react-buddy/ide-toolbox-next';
import { Fragment, ReactElement } from 'react';

export function ExampleLoaderComponent(): ReactElement {
  return (
    <Fragment>Loading...</Fragment>
  );
}

export const PaletteTree = (): ReactElement => {
  return (
    <Palette>
      <Category name="App">
        <Component name="Loader">
          <Variant>
            <ExampleLoaderComponent/>
          </Variant>
        </Component>
      </Category>
    </Palette>
  );
};
