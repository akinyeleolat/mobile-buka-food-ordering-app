// correct order data
export const orderData={
    item:[
		{itemId:'1',quantity:'12'}
		],
		amountDue:'2000'
}
// empty order
export const orderData2={
    item:[],
	amountDue:'2000'
}
// empty order 
export const orderData3={
    item:[
		{itemId:'',quantity:'12'}
		],
		amountDue:'2000'
}
// emppty order
export const orderData4={
    item:[
		{itemId:' ',quantity:'12'}
		],
		amountDue:'2000'
}
// item and quantity without number
export const orderData5={
    item:[
		{itemId:'asd',quantity:'12'}
		],
		amountDue:'2000'
}
// must not be zero
export const orderData6={
    item:[
		{itemId:'1',quantity:'0'}
		],
		amountDue:'2000'
}

