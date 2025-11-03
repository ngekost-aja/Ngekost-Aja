import Review from "@/models/Review";

const reviews: Review[] = [
  {
    id: 1,
    userId: 3,
    houseId: 1,
    rating: 5,
    comment: "The room was clean and cozy! The manager was very helpful.",
    createdAt: "2025-01-16T09:30:00Z",
  },
  {
    id: 2,
    userId: 4,
    houseId: 2,
    rating: 4,
    comment: "Nice place overall, but the Wi-Fi could be faster.",
    createdAt: "2025-02-08T14:10:00Z",
  },
  {
    id: 3,
    userId: 5,
    houseId: 3,
    rating: 3,
    comment:
      "Average experience. The room was okay, but the bathroom needs improvement.",
    createdAt: "2025-03-11T11:45:00Z",
  },
  {
    id: 4,
    userId: 2,
    houseId: 1,
    rating: 5,
    comment: "Excellent service and location. Definitely coming back!",
    createdAt: "2025-04-21T08:00:00Z",
  },
  {
    id: 5,
    userId: 6,
    houseId: 4,
    rating: 4,
    comment: "Great value for money. Everything was neat and comfortable.",
    createdAt: "2025-05-04T18:20:00Z",
  },
  {
    id: 6,
    userId: 7,
    houseId: 2,
    rating: 2,
    comment: "The air conditioner wasn’t working properly during my stay.",
    createdAt: "2025-05-19T09:50:00Z",
  },
  {
    id: 7,
    userId: 3,
    houseId: 5,
    rating: 5,
    comment: "Perfect place for a weekend stay. Very peaceful and clean.",
    createdAt: "2025-06-07T12:15:00Z",
  },
  {
    id: 8,
    userId: 8,
    houseId: 3,
    rating: 3,
    comment: "The staff was friendly, but the room could use better lighting.",
    createdAt: "2025-06-26T10:10:00Z",
  },
  {
    id: 9,
    userId: 5,
    houseId: 6,
    rating: 4,
    comment: "Nice and quiet environment. I had a pleasant stay overall.",
    createdAt: "2025-07-11T13:00:00Z",
  },
  {
    id: 10,
    userId: 9,
    houseId: 4,
    rating: 5,
    comment: "Loved everything about this place. Highly recommended!",
    createdAt: "2025-08-14T16:30:00Z",
  },
];

export default reviews;
