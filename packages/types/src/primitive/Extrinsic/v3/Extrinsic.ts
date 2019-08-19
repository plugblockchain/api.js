// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Address, Call } from '../../../interfaces/runtime';
import { ExtrinsicPayloadValue, IExtrinsicImpl, IKeyringPair, SignatureOptions } from '../../../types';
import { ExtrinsicOptions } from '../types';

import { isU8a } from '@plugnet/util';

import { createType, ClassOf } from '../../../codec/create';
import Struct from '../../../codec/Struct';
import ExtrinsicSignatureV3 from './ExtrinsicSignature';

const TRANSACTION_VERSION = 3;

export interface ExtrinsicValueV3 {
  method?: Call;
  signature?: ExtrinsicSignatureV3;
}

/**
 * @name ExtrinsicV3
 * @description
 * The second generation of compact extrinsics
 */
export default class ExtrinsicV3 extends Struct implements IExtrinsicImpl {
  public constructor (value?: Uint8Array | ExtrinsicValueV3 | Call, { isSigned }: ExtrinsicOptions = {}) {
    super({
      signature: ExtrinsicSignatureV3,
      method: 'Call'
    }, ExtrinsicV3.decodeExtrinsic(value, isSigned));
  }

  public static decodeExtrinsic (value?: Call | Uint8Array | ExtrinsicValueV3, isSigned: boolean = false): ExtrinsicValueV3 {
    if (!value) {
      return {};
    } else if (value instanceof ExtrinsicV3) {
      return value;
    } else if (value instanceof ClassOf('Call')) {
      return { method: value };
    } else if (isU8a(value)) {
      // here we decode manually since we need to pull through the version information
      const signature = new ExtrinsicSignatureV3(value, { isSigned });
      const method = createType('Call', value.subarray(signature.encodedLength));

      return {
        method,
        signature
      };
    }

    return value;
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  public get encodedLength (): number {
    return this.toU8a().length;
  }

  /**
   * @description The [[Call]] this extrinsic wraps
   */
  public get method (): Call {
    return this.get('method') as Call;
  }

  /**
   * @description The [[ExtrinsicSignatureV3]]
   */
  public get signature (): ExtrinsicSignatureV3 {
    return this.get('signature') as ExtrinsicSignatureV3;
  }

  /**
   * @description The version for the signature
   */
  public get version (): number {
    return TRANSACTION_VERSION;
  }

  /**
   * @description Add an [[ExtrinsicSignatureV3]] to the extrinsic (already generated)
   */
  public addSignature (signer: Address | Uint8Array | string, signature: Uint8Array | string, payload: ExtrinsicPayloadValue | Uint8Array | string): ExtrinsicV3 {
    this.signature.addSignature(signer, signature, payload);

    return this;
  }

  /**
   * @description Sign the extrinsic with a specific keypair
   */
  public sign (account: IKeyringPair, options: SignatureOptions): ExtrinsicV3 {
    this.signature.sign(this.method, account, options);

    return this;
  }
}
