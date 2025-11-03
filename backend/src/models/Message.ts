export default interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    messageText: string;
    sentAt: string;
    isRead: boolean;
}
