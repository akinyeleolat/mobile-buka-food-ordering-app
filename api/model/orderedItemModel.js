
const fetchorderItems = () => {
  const orderItems = [
    {
      id: 1, orderId: 1, itemName: 'Sausage Roll', itemPrice: 200, quantity: 23,
    },
    {
      id: 2, orderId: 1, itemName: 'Marinated Banana', itemPrice: 250, quantity: 22,
    },
    {
      id: 3, orderId: 2, itemName: 'Sushi Cuisine', itemPrice: 250, quantity: 20,
    },
    {
      id: 4, orderId: 2, itemName: 'Vegies Chicken', itemPrice: 250, quantity: 25,
    },
  ];
  return orderItems;
};
export default fetchorderItems();
