// Copyright 2017-2019 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BlockNumber } from '@plugnet/types/srml/types';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiInterfaceRx } from '@plugnet/api/types';
import { Header } from '@plugnet/types';

import { drr } from '../util/drr';

/**
 * @name bestNumber
 * @returns The latest block number.
 * @example
 * <BR>
 *
 * ```javascript
 * api.derive.chain.bestNumber((blockNumber) => {
 *   console.log(`the current best block is #${blockNumber}`);
 * });
 * ```
 */
export function bestNumber (api: ApiInterfaceRx): () => Observable<BlockNumber> {
  return (): Observable<BlockNumber> =>
    (api.rpc.chain.subscribeNewHead() as Observable<Header>)
      .pipe(
        filter((header: Header): boolean => !!header && !!header.blockNumber),
        map(({ blockNumber }: Header): BlockNumber => blockNumber),
        drr()
      );
}
