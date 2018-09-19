
/**
 * This function handles the order data
 * @returns {object} order.
 */
const fetchorder = () => {
  const order = [
    {
      id: 1,
      customerName: 'Adesola James',
      deliveryAddress: 'CA 50, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
      item: [
        { itemName: 'Sausage Roll', itemPrice: 200, quantity: 23 },
        { itemName: 'Marinated Banana', itemPrice: 250, quantity: 22 },
      ],
    },
    {
      id: 2,
      customerName: 'Adekunle Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
      item: [
        { itemName: 'Sushi Cuisine', itemPrice: 250, quantity: 20 },
        { itemName: 'Vegies Chicken', itemPrice: 250, quantity: 25 },
      ],
    },
    {
      id: 3,
      customerName: 'Adebisi Felicia',
      deliveryAddress: 'CA 60, Ambrose Street,Allen',
      orderStatus: 'Not Accepted',
    },
  ];
  return order;
};
export default fetchorder();
