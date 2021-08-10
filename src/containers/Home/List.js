import React, { useContext, useEffect, useState } from 'react';
import { clientContext } from '../../contexts/ClientContext';
import MediaCard from './MediaCard'
import { useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';


const List = (props) => {
    let history = useHistory();
    const [page, setPage] = useState(getPage())
    const { getProducts, products, paginatedPages, getProductsByPagination } = useContext(clientContext)
    useEffect(() => {
        getProductsByPagination(0)
    }, [])

    function getPage(e, page) {
        const search = new URLSearchParams(history.location.search)
        if (!search.get('_page')) {
            return 1
        }
        return search.get('_page')
    }

    const handlePage = (e, pageVal) => {
        getProductsByPagination(pageVal)
        setPage(pageVal)
    }

    return (
        <div className="list">
            {
                products ? (
                    products.length ? (
                        products.map(product => (
                            <MediaCard key={product.id} product={product} />
                        )

                        )
                    ) : (
                        <h1>net tovara</h1>
                    )
                ) : (
                    <h1>loading</h1>
                )
            }
            <div>
                <Pagination
                    count={Math.ceil(paginatedPages / 5)}
                    color="primary"
                    onChange={handlePage}
                    page={page}
                />
            </div>
        </div>
    );
};

export default List;