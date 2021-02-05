import { Origin } from './Origin';

export interface OriginFactory
{
    getOrigin(): Origin;
}
