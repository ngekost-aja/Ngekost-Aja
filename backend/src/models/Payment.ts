export default interface Payment {
    id: number;
    bookingId: number;
    paymentMethod: string;
    amount: number;
    status: string;
    transactionDate: string;
}
