// Copyright 2017-2018 @polkadot/storage authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { createType } from '@polkadot/api-codec/codec';
import { StorageFunctionMetadata } from '@polkadot/api-codec/Metadata';
import { StorageFunction } from '@polkadot/api-codec/StorageKey';
import { Text } from '@polkadot/api-codec/index';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aFromUtf8 from '@polkadot/util/u8a/fromUtf8';
import xxhash from '@polkadot/util-crypto/xxhash/asU8a';

export interface CreateItemOptions {
  isUnhashed?: boolean;
}

/**
 * From the schema of a function in the module's storage, generate the function
 * that will return the correct storage key.
 *
 * @param schema - The function's definition schema to create the function from.
 * The schema is taken from state_getMetadata.
 * @param options - Additional options when creating the function. These options
 * are not known at runtime (from state_getMetadata), they need to be supplied
 * by us manually at compile time.
 */
export default function createFunction (
  prefix: string | Text,
  name: string | Text,
  meta: StorageFunctionMetadata,
  options: CreateItemOptions = {}
): StorageFunction {
  let storageFn: any;

  if (options.isUnhashed) {
    storageFn = (): Uint8Array =>
      u8aFromUtf8(name.toString());
  } else {
    // TODO Find better type than any
    // Can only have zero or one argument:
    // - storage.balances.freeBalance(address)
    // - storage.timestamp.blockPeriod()
    storageFn = (arg?: any): Uint8Array => {
      if (!meta.type.isMap) {
        return xxhash(
          u8aFromUtf8(`${prefix.toString()} ${name.toString()}`),
          128
        );
      }

      if (!arg) {
        throw new Error(`${meta.name} expects one argument`);
      }

      const type = meta.type.asMap.key.toString(); // Argument type, as string

      return xxhash(
        u8aConcat(
          u8aFromUtf8(`${prefix.toString()} ${name.toString()}`),
          createType(type, arg).toU8a(true)
        ),
        128
      );
    };
  }

  storageFn.meta = meta;
  storageFn.toJSON = meta.toJSON;

  return storageFn as StorageFunction;
}