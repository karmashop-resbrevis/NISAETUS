import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
	isProduction: false,
	serverKey: process.env.MIDTRANS_SERVER_KEY,
	clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export async function POST(request) {
	try {
		const body = await request.json();

		const parameter = {
			transaction_details: {
				order_id: 'ORDER-KRM-' + new Date().getTime(),
				gross_amount: body.total_amount
			},
			item_details: [
				...body.items.map(item => ({
					id: item.id,
					price: item.price,
					quantity: item.quantity,
					name: item.name,
					brand: "Deus Vult",
					category: "Fashion",
					merchant_name: "Karma Shop"
				})),
				{
					id: 'SHIPPING-FEE',
					price: body.shipping_fee,
					quantity: 1,
					name: 'Shipping Fee',
					category: 'Shipping'
				}
			],
			customer_details: {
				first_name: body.customer_details.first_name,
				last_name: body.customer_details.last_name,
				email: body.customer_details.email,
				phone: body.customer_details.phone,
				shipping_address: body.customer_details.shipping_address,
				billing_address: body.customer_details.billing_address
			}
		};

		const transaction = await snap.createTransaction(parameter);

		return NextResponse.json({
			token: transaction.token
		});
	} catch (error) {
		console.error('Error creating Midtrans transaction:', error);
		return NextResponse.json(
			{ error: 'Failed to create transaction' },
			{ status: 500 }
		);
	}
}