import * as React from 'react';
import { Donate3ContextType } from '../@types/donate3';
export declare const Donate3Context: React.Context<Donate3ContextType>;
declare const Donate3Provider: React.FC<{
    children: React.ReactNode;
    toAddress: string;
    type: number;
    color: string;
    title: string;
}>;
export default Donate3Provider;
