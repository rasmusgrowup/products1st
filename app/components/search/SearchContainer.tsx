// /components/search/SearchContainer.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { Product, SearchProductResponse } from '@/types/products';
import styles from "@/styles/components/Search.module.scss";
import Link from "next/link";

const SearchContainer: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    // Ref to store the height of the results container
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState<number | null>(null);

    // Function to fetch products from the Next.js API route
    const fetchProducts = async (currentQuery: string, currentPage: number = 1, limit: number = 10, append: boolean = false) => {
        // Set the container height before loading starts
        if (containerRef.current && !append) {
            setContainerHeight(containerRef.current.clientHeight);
        }
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<SearchProductResponse>('/api/products', {
                params: { title: currentQuery, page: currentPage, limit }
            });

            const data = response.data;
            const content = data.content ?? []; // Use an empty array if `data.content` is undefined

            setResults(prevResults => {
                // Append to existing results if `append` is true; otherwise, reset results
                return append ? [...prevResults, ...content] : content;
            });
            setHasMore(content.length >= limit); // Set `hasMore` based on the limit and data length
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to fetch products. Please try again.');
        } finally {
            setLoading(false);
            setContainerHeight(null); // Reset the height after loading is complete
        }
    };

    // Debounced fetch function for search input
    const debouncedFetch = useCallback(debounce((query) => fetchProducts(query, 1, 10, false), 500), []);

    // Fetch default products on initial mount
    useEffect(() => {
        fetchProducts('', 1); // Empty query loads default products
    }, []);

    // Handle input change and reset pagination
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
        setPage(1); // Reset to the first page
        setResults([]); // Clear previous results on new search
        debouncedFetch(inputValue);
    };

    // Load more results when the "Load More" button is clicked
    const loadMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchProducts(query, nextPage, 10, true); // Set `append` to true to keep existing products
    };

    const productCount = results.length;

    return (
        <div className={styles.searchContainer}>
            <header className={styles.searchHeader}>
                <input
                    type="text"
                    placeholder="Søg efter produkter ..."
                    value={query}
                    onChange={handleSearchInput}
                    className={styles.input}
                />
                {loading && (
                    <div className={styles.spinner}></div>
                )}
            </header>
            <div
                className={styles.resultsContainer}
                ref={containerRef}
                style={{
                    minHeight: containerHeight ? `${containerHeight}px` : 'auto'
                }}
            >
                {error && <div className={styles.error}>{error}</div>}

                {!error && <ul className={styles.productList}>
                    <li className={styles.resultsInfo}>Viser resultater for: {!query ? 'Alle' : query}</li>
                    {results.length > 0 &&
                        <li className={styles.productListHeader}>
                            <h3 className={styles.headerTitle}>Produktnavn</h3>
                            <p className={styles.headerSupplierName}>Forhandler</p>
                            <p className={styles.headerPrice}>Pris</p>
                        </li>
                    }
                    {results.map((product) => (
                        <li key={product.id}>
                            <Link href={`/products/${product.id}`} className={styles.product}>
                                <h3 className={styles.productTitle}>{product.title}</h3>
                                <p className={styles.productSupplierName}>{product.suppliername || 'Unknown'}</p>
                                <p className={styles.productPrice}>{product.price}{',- DKK'}</p>
                            </Link>
                        </li>
                    ))}
                </ul>}

                {hasMore && !loading &&
                    <div className={styles.buttonContainer}>
                        <div className={styles.resultAmount}>Viser {productCount} produkter</div>
                        <button onClick={loadMore} className={styles.button}>
                            Indlæs flere
                        </button>
                    </div>
                }
                {!hasMore && !loading &&
                    <div className={styles.buttonContainer}>
                        <div className={styles.resultAmount}>Viser {productCount} produkter</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchContainer;