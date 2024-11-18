// app/products/[id]/page.tsx

import axios from 'axios';
import { Product } from '@/types/products';
import styles from "@/styles/common/ProductDetails.module.scss";
import Link from "next/link";

const ProductDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    let product: Product | null = null;

    try {
        const response = await axios.get<Product>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
        product = response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        // @ts-ignore
        return <div>Failed to fetch product details: {error.message}</div>;
    }

    return (
        <div className={styles.productDetails}>
            <div className={styles.linkTree}>
                <Link href={'/'}>{'< '}Tilbage</Link>
            </div>
            <div className={styles.productContainer}>
                {product ? (
                    <>
                        <h1 className={styles.productTitle}>{product.title}</h1>
                        <ul className={styles.detailsList}>
                            <li className={styles.productSupplier}>Produkt.nr.: {product.productno || 'N/A'}</li>
                            <li className={styles.productsupplier}>Forhandler: {product.suppliername || 'N/A'}</li>
                            <li className={styles.productsupplier}>Brand: {product.brand || 'N/A'}</li>
                            <li className={styles.productsupplier}>Antal på lager: {product.stockno || 'N/A'}</li>
                            <li className={styles.productsupplier}>Min. antal: {product.stockmin || 'N/A'}</li>
                            <li className={styles.productsupplier}>Max. antal: {product.stockmax || 'N/A'}</li>
                        </ul>
                        <h2 className={styles.productPrice}>Price: {product.price},- DKK ex. MOMS</h2>
                    </>
                ) : (
                    <div>Product not found</div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;