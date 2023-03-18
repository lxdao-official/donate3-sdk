interface Args {
    chainType: string;
    coinType: number;
    createTime: number;
    fromAddress: `0x${string}` | undefined;
    hash: `0x${string}` | undefined;
    id: `0x${string}` | undefined;
    message: string;
    status: number;
    toAddress: string;
    updateTime: number;
    usdValue: string;
    userId: `0x${string}` | undefined;
    value: string;
}
declare const useDonate: () => (args: Args) => Promise<any>;
export default useDonate;
