// pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import productsData from '../../../data/products.json';
import { Product } from '@/types/products';

export default function handler(req: NextApiRequest, res: NextApiResponse<Product | { message: string }>) {
    const { id } = req.query;

    // Find the product by ID
    const product = productsData.content.find((p: Product) => p.id === parseInt(id as string));

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
}