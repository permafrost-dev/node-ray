/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/// <reference lib="dom" />

import { Ray } from '@/Ray';

export enum SendRequestCallbackType {
    Sending = 'sending',
    Sent = 'sent',
}

export type RayCallback = (r: Ray) => void;

export type { PayloadTypes } from '@/Payloads';
