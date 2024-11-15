import { NextApiRequest, NextApiResponse } from 'next';
import { Product, SearchProductResponse } from '../../types/products';
import productsData from '../../data/products.json';

const products: Product[] = Array.isArray(productsData.content) ? (productsData.content as unknown as Product[]) : [];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SearchProductResponse>
) {
    const { title, productno, minPrice, maxPrice, suppliername, brand, page, limit } = req.query;

    let filteredProducts: Product[] = [...products];

    // Full-text search logic for the `title` field using multiple keywords
    if (typeof title === 'string') {
        const keywords = title.toLowerCase().split(' ').filter(Boolean); // Split the title query into keywords
        filteredProducts = filteredProducts.filter((product) => {
            const productTitle = product.title?.toLowerCase() || '';
            // Check if every keyword is present in the product title
            return keywords.every((keyword) => productTitle.includes(keyword));
        });
    }

    // Apply other filters based on query parameters
    if (typeof productno === 'string') {
        filteredProducts = filteredProducts.filter((product) => product.productno === productno);
    }

    if (typeof minPrice === 'string' && typeof maxPrice === 'string') {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        filteredProducts = filteredProducts.filter(
            (product) =>
                product.price !== undefined &&
                product.price >= min &&
                product.price <= max
        );
    }

    if (typeof suppliername === 'string') {
        filteredProducts = filteredProducts.filter((product) =>
            product.suppliername?.toLowerCase().includes(suppliername.toLowerCase())
        );
    }

    if (typeof brand === 'string') {
        filteredProducts = filteredProducts.filter((product) =>
            product.brand?.toLowerCase().includes(brand.toLowerCase())
        );
    }

    // Conditional Pagination: Apply pagination only if `page` and `limit` are provided
    if (typeof page === 'string' && typeof limit === 'string') {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const start = (pageNum - 1) * limitNum;
        filteredProducts = filteredProducts.slice(start, start + limitNum);
    }

    // Construct the response with the final filtered and (optionally paginated) data
    const response: SearchProductResponse = { content: filteredProducts };
    res.status(200).json(response);
}