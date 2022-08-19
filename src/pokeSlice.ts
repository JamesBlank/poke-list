import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import { RootState } from './app/store';
import { fetchPokeCard, fetchPokeList } from './pokeApi';

export interface PokeListItem {
    name: string;
    url: string;
}

export interface PokeCard {
    id: number;
    height: number;
    weight: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                'front_default': string;
            };
        };
    };
}

export interface PokeState {
  status: 'idle' | 'loading' | 'failed';
  list: Array<PokeListItem>;
  count: number;
  cards: Record<number, PokeCard>;
}

const initialState: PokeState = {
  status: 'idle',
  list: [],
  count: 0,
  cards: {},
};

export const pokeListAsync = createAsyncThunk(
  'pokemon/fetchList',
  async (params: {page: number, pageSize: number}) => {
    const response = await fetchPokeList(params);
    return response;
  }
);

export const pokeCardAsync = createAsyncThunk(
    'pokemon/fetchCard',
    async (id: number, { getState }) => {
        const state = getState() as RootState;
        if (id in state.pokemon.cards) {
            return state.pokemon.cards[id];
        } else {
            return await fetchPokeCard(id);
        }
    },
);

export const pokeSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        updatePokeCard(state, action: PayloadAction<PokeCard>) {
            state.cards[action.payload.id] = action.payload;
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(pokeListAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(pokeListAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.list = action.payload.results;
            state.count = action.payload.count;
        })
        .addCase(pokeListAsync.rejected, (state) => {
            state.status = 'failed';
        })

        .addCase(pokeCardAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(pokeCardAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.cards[action.payload.id] = action.payload;
        })
        .addCase(pokeCardAsync.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export const selectPokeStatus = (state: RootState) => state.pokemon.status;
export const selectPokeList = (state: RootState) => state.pokemon.list;
export const selectPokeCount = (state: RootState) => state.pokemon.count;

export const { updatePokeCard } = pokeSlice.actions;

export default pokeSlice.reducer;
