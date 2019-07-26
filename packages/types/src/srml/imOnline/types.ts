// Auto-generated via `yarn build:srmlTs`, do not edit

import { Option, Struct, Vec } from '../../codec';
import { Bytes } from '../../primitive';
import { BlockNumber } from '../runtime/types';
import { AuthorityId } from '../consensus/types';
import { SessionIndex } from '../session/types';

/** Struct */
export interface Heartbeat extends Struct {
  /** BlockNumber */
  readonly blockNumber: BlockNumber;
  /** OpaqueNetworkState */
  readonly networkState: OpaqueNetworkState;
  /** SessionIndex */
  readonly sessionIndex: SessionIndex;
  /** AuthorityId */
  readonly authorityId: AuthorityId;
}

/** Bytes */
export type OpaqueMultiaddr = Bytes;

/** Struct */
export interface OpaqueNetworkState extends Struct {
  /** OpaquePeerId */
  readonly peerId: OpaquePeerId;
  /** Vec<OpaqueMultiaddr> */
  readonly externalAddresses: Vec<OpaqueMultiaddr>;
}

/** Bytes */
export type OpaquePeerId = Bytes;

declare module '@plugnet/types/interfaceRegistry' {
  export interface InterfaceRegistry {
    OpaqueMultiaddr: OpaqueMultiaddr;
    'Option<OpaqueMultiaddr>': Option<OpaqueMultiaddr>;
    'Vec<OpaqueMultiaddr>': Vec<OpaqueMultiaddr>;
    OpaquePeerId: OpaquePeerId;
    'Option<OpaquePeerId>': Option<OpaquePeerId>;
    'Vec<OpaquePeerId>': Vec<OpaquePeerId>;
    OpaqueNetworkState: OpaqueNetworkState;
    'Option<OpaqueNetworkState>': Option<OpaqueNetworkState>;
    'Vec<OpaqueNetworkState>': Vec<OpaqueNetworkState>;
    Heartbeat: Heartbeat;
    'Option<Heartbeat>': Option<Heartbeat>;
    'Vec<Heartbeat>': Vec<Heartbeat>;
  }
}
