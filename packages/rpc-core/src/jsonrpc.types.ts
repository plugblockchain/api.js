// Auto-generated via `yarn build:interfaces`, do not edit
/* eslint-disable @typescript-eslint/no-empty-interface */

import { Observable } from 'rxjs';
import { Vec } from '@plugnet/types/codec';
import { Bytes, Metadata, StorageData, StorageKey, Text, u64 } from '@plugnet/types';
import { BlockNumber, Extrinsic, Hash, Header, SignedBlock } from '@plugnet/types/interfaces/runtime';
import { ChainProperties, ExtrinsicOrHash, ExtrinsicStatus, Health, NetworkState, PeerInfo, RuntimeVersion, StorageChangeSet } from '@plugnet/types/interfaces/rpc';
import { Codec, IExtrinsic } from '@plugnet/types/types';

export interface RpcInterface {
  author: {
    insertKey(keyType: Text | string, suri: Text | string, publicKey: Bytes | Uint8Array | string): Observable<Bytes>;
    pendingExtrinsics(): Observable<Vec<Extrinsic>>;
    removeExtrinsic(bytesOrHash: (ExtrinsicOrHash)[]): Observable<Vec<Hash>>;
    rotateKeys(): Observable<Bytes>;
    submitAndWatchExtrinsic(extrinsic: IExtrinsic): Observable<ExtrinsicStatus>;
    submitExtrinsic(extrinsic: IExtrinsic): Observable<Hash>;
  };
  chain: {
    getBlock(hash?: Hash | Uint8Array | string): Observable<SignedBlock>;
    getBlockHash(blockNumber?: BlockNumber | Uint8Array | number | string): Observable<Hash>;
    getFinalizedHead(): Observable<Hash>;
    getHeader(hash?: Hash | Uint8Array | string): Observable<Header>;
    subscribeFinalizedHeads(): Observable<Header>;
    subscribeNewHeads(): Observable<Header>;
  };
  state: {
    call(method: Text | string, data: Bytes | Uint8Array | string, block?: Hash | Uint8Array | string): Observable<Bytes>;
    getChildKeys(childStorageKey: any, prefix: any, block?: Hash | Uint8Array | string): Observable<Vec<StorageKey>>;
    getChildStorage(childStorageKey: any, key: any, block?: Hash | Uint8Array | string): Observable<StorageData>;
    getChildStorageHash(childStorageKey: any, key: any, block?: Hash | Uint8Array | string): Observable<Hash>;
    getChildStorageSize(childStorageKey: any, key: any, block?: Hash | Uint8Array | string): Observable<u64>;
    getKeys(prefix: any, block?: Hash | Uint8Array | string): Observable<Vec<StorageKey>>;
    getMetadata(block?: Hash | Uint8Array | string): Observable<Metadata>;
    getRuntimeVersion(hash?: Hash | Uint8Array | string): Observable<RuntimeVersion>;
    getStorage<T = Codec>(key: any, block?: Hash | Uint8Array | string): Observable<T>;
    getStorageHash(key: any, block?: Hash | Uint8Array | string): Observable<Hash>;
    getStorageSize(key: any, block?: Hash | Uint8Array | string): Observable<u64>;
    queryStorage(keys: (any)[], startBlock: Hash | Uint8Array | string, block?: Hash | Uint8Array | string): Observable<Vec<StorageChangeSet>>;
    subscribeRuntimeVersion(): Observable<RuntimeVersion>;
    subscribeStorage<T = Codec[]>(keys: any[]): Observable<T>;
  };
  system: {
    chain(): Observable<Text>;
    health(): Observable<Health>;
    name(): Observable<Text>;
    networkState(): Observable<NetworkState>;
    peers(): Observable<Vec<PeerInfo>>;
    properties(): Observable<ChainProperties>;
    version(): Observable<Text>;
  };
}
