// Copyright 2017-2019 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isObservable } from '@plugnet/util';

import ApiRx from './Api';

describe('ApiRx', (): void => {
  it('has isConnected', (): void => {
    const api = new ApiRx();

    expect(
      isObservable(api.isConnected)
    ).toBe(true);
  });
});
