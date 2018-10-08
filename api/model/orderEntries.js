// correct order data
export const orderData = {
  item: [{ itemId: '1', quantity: '12' }],
};
// empty order
export const orderData2 = {
  item: [],
};
// empty order
export const orderData3 = {
  item: [
    { itemId: '', quantity: '12' },
  ],
};
// emppty order
export const orderData4 = {
  item: [
    { itemId: ' ', quantity: '12' },
  ],
};
// item and quantity without number
export const orderData5 = {
  item: [
    { itemId: 'asd', quantity: '12' },
  ],
};
// must not be zero
export const orderData6 = {
  item: [
    { itemId: '1', quantity: '0' },
  ],
};
// NO valid item
export const orderData7 = {
  item: [{ itemId: '2', quantity: '12' }],
};

