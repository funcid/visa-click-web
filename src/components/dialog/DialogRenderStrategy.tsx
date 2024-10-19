import { isFunction } from '@bunt/is';
import { ReactElement, Suspense } from 'react';

import { Loader } from '../loader';
import { DialogAsync, DialogPropsAsync } from './DialogAsync';
import { DialogPropsSimple } from '.';

function isAsyncProps(
  props: DialogPropsSimple | DialogPropsAsync<any>,
): props is DialogPropsAsync<any> {
  return isFunction(props.dialog);
}

export function DialogRenderStrategy(
  props: DialogPropsSimple | DialogPropsAsync<any>,
): ReactElement | null {
  if (isAsyncProps(props)) {
    return <DialogAsync {...props} />;
  }

  return <Suspense fallback={<Loader />}>{props.dialog}</Suspense>;
}
