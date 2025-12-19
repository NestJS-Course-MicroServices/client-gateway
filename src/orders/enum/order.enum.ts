export enum OrderStatus {
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    DELIVERED = 'DELIVERED'
}

export const orderStatusList = [
    OrderStatus.PENDING,
    OrderStatus.CANCELLED,
    OrderStatus.DELIVERED
];