// Copyright 2017-2019 @polkadot/extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Metadata } from '@plugnet/types';
import metadataRpc from '@plugnet/types/Metadata/v4/static';
import { ModulesWithMethods } from '@plugnet/types/primitive/Method';

import fromMetadata from './fromMetadata';

const staticMetadata: ModulesWithMethods = fromMetadata(
  new Metadata(metadataRpc)
);
export default staticMetadata;
