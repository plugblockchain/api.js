// Copyright 2017-2019 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BlockNumber } from '@plugnet/types/interfaces';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiInterfaceRx } from '@plugnet/api/types';

import { drr } from '../util/drr';

/**
 * @name bestNumberFinalized
 * @returns A BlockNumber
 * @description Get the latest finalized block number.
 * @example
 * <BR>
 *
 * ```javascript
 * api.derive.chain.bestNumberFinalized((blockNumber) => {
 *   console.log(`the current finalized block is #${blockNumber}`);
 * });
 * ```
 */
export function bestNumberFinalized (api: ApiInterfaceRx): () => Observable<BlockNumber> {
  return (): Observable<BlockNumber> =>
    api.rpc.chain.subscribeFinalizedHeads().pipe(
      map((header): BlockNumber => header.number.unwrap()),
      drr()
    );
}
