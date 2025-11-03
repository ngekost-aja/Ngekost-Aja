export default interface House {
    id: number;
    name: string;
    description: string;
    location: string;
    pricePerMonth: number;
    facilities: string[];
    type: string;
    images: string[];
    managerId: number;
    ownerId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}
