// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import polkadotJson from './latest.polkadot.v5.json';
import substrateJson from './latest.substrate.v5.json';
import polkadotData from './static.polkadot';
import substrateData from './static';
import { decodeLatestSubstrate, defaultValues, toV7 } from '../util/testUtil';

describe('MetadataV5 (substrate)', (): void => {
  decodeLatestSubstrate(5, substrateData, substrateJson);

  toV7(5, substrateData);

  defaultValues(substrateData);
});

describe('MetadataV5 (polkadot)', (): void => {
  decodeLatestSubstrate(5, polkadotData, polkadotJson);

  toV7(5, polkadotData);

  defaultValues(polkadotData);
});
