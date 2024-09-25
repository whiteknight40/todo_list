import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Task { 'title' : string, 'content' : string }
export interface _SERVICE {
  'addTask' : ActorMethod<[string, string], undefined>,
  'getTasks' : ActorMethod<[], Array<Task>>,
  'removeTask' : ActorMethod<[bigint], Array<Task>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
