import { useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import styled from '@mui/system/styled';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    pokeListAsync,
    selectPokeList,
    selectPokeCount,
} from '../../pokeSlice';
import PokeItem from '../PokeItem/PokeItem';

const PAGE_SIZE = 10;

const PokePagination = styled(Pagination)({
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
});

const PokeList = () => {
    const pokeList = useAppSelector(selectPokeList);
    const pokeCount = useAppSelector(selectPokeCount);
    const dispatch = useAppDispatch();
    const [ searchParams ] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        dispatch(pokeListAsync({page, pageSize: PAGE_SIZE }));
    });

    const handlePaginationChange = useCallback((e: React.ChangeEvent<unknown>, newPage: number) => {
        dispatch(pokeListAsync({page: newPage, pageSize: PAGE_SIZE }));
    }, [ dispatch ]);

    const renderPagination = () => {
        return (
            <PokePagination
                page={ page }
                count={ Math.ceil(pokeCount / PAGE_SIZE) }
                onChange={ handlePaginationChange }
                renderItem={(item) => (
                    <PaginationItem
                        component={ Link }
                        to={ '/pokelist' + (item.page === 1 ? '' : '?page=' + item.page) }
                        { ...item }
                    />
                )}
            />
        );
    }

    return (
        <>
            <List sx={{ width: '400px', margin: 'auto' }}>
                <div className="PokeList__title">
                    List of Pokemons
                </div>
                { pokeList.map(pokemon => {
                    const pokeIndex = pokemon.url.split('/').at(-2);
                    return (
                        <Link to={ '/pokecard/' + pokeIndex } key={ pokeIndex } className="PokeList__link">
                            <PokeItem pokeIndex={ pokeIndex } pokeName={ pokemon.name }/>
                        </Link>
                    );
                }) }
            </List>
            { renderPagination() }
        </>
    );
}

export default PokeList;
