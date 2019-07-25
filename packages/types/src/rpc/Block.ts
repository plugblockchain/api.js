// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Hash } from '../srml/runtime/types';
import { AnyU8a } from '../types';

import { blake2AsU8a } from '@plugnet/util-crypto';

import createType, { ClassOf } from '../codec/createType';
import Extrinsic from '../primitive/Extrinsic/Extrinsic';
import Struct from '../codec/Struct';
import Vector from '../codec/Vector';
import Header, { HeaderValue } from './Header';

export interface BlockValue {
  extrinsics?: AnyU8a[];
  header?: HeaderValue;
}

/**
 * @name Block
 * @description
 * A block encoded with header and extrinsics
 */
export default class Block extends Struct {
  public constructor (value?: BlockValue | Uint8Array) {
    super({
      header: Header,
      extrinsics: ClassOf<Vector<Extrinsic>>('Vec<Extrinsic>')
    }, value);
  }

  /**
   * @description Encodes a content [[Hash]] for the block
   */
  public get contentHash (): Hash {
    return createType('Hash', blake2AsU8a(this.toU8a(), 256));
  }

  /**
   * @description The [[Extrinsic]] contained in the block
   */
  public get extrinsics (): Vector<Extrinsic> {
    return this.get('extrinsics') as Vector<Extrinsic>;
  }

  /**
   * @description Block/header [[Hash]]
   */
  public get hash (): Hash {
    return this.header.hash;
  }

  /**
   * @description The [[Header]] of the block
   */
  public get header (): Header {
    return this.get('header') as Header;
  }
}
