interface ICoupon {
    code: string;
    expired: Date;
    quantity: number;
    priceReduce: number;
    percentageReduce: number;
}
export default ICoupon;
