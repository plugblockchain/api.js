// Copyright 2017-2019 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ApiInterfaceRx } from '@plugnet/api/types';
import { Observable } from 'rxjs';
import { AccountId, Vector, SetIndex } from '@plugnet/types';
import { map } from 'rxjs/operators';
import { drr } from '../util/drr';
import { voterSets } from './voterSets';

/**
 * @name voters
 * @returns An array of all current voters from all sets.
 * @example
 * <BR>
 *
 * ```javascript
 * api.derive.elections.voters((voters) => {
 *   console.log(`There are ${voters.length} current voters.`);
 * });
 * ```
 */
export function voters (api: ApiInterfaceRx): () => Observable<Vector<AccountId>> {
  return (): Observable<Vector<AccountId>> =>
    voterSets(api)().pipe(
      map(
        (voterSets: Record<string, SetIndex>): Vector<AccountId> =>
          new Vector(
            AccountId,
            Object.keys(voterSets).map(
              address => new AccountId(address)
            )
          )
      ),
      drr()
    );
}