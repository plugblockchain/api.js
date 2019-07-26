// Copyright 2017-2019 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ApprovalFlag } from '@plugnet/types/interfaces/elections';

import { Vec } from '@plugnet/types';

export function approvalFlagsToBools (flags: Vec<ApprovalFlag>): boolean[] {
  const bools: boolean[] = [];

  flags.forEach((flag: ApprovalFlag): void => {
    const str = flag.toString(2);

    for (const bit of str) {
      bools.push(!!parseInt(bit, 10));
    }
  });

  return bools;
}
