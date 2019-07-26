// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import createType from '../../codec/createType';
import { injectDefinitions } from '..';

describe('KeyValueOption', (): void => {
  beforeEach((): void => {
    injectDefinitions();
  });

  it('exposes the properties for key/value', (): void => {
    const [key, value] = createType('KeyValueOption', [
      '0x11223344'
    ]);

    expect(key.toHex()).toEqual('0x11223344');
    expect(value.isNone).toEqual(true);
  });
});
