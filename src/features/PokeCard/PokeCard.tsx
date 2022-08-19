import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import { useAppDispatch } from '../../app/hooks';

import { pokeCardAsync, updatePokeCard } from '../../pokeSlice';
import type { PokeCard as TPokeCard } from '../../pokeSlice';

import fallbackImg from '../../unknown.png';

const PokeCard = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ pokeCard, setPokeCard ] = useState<TPokeCard>();
    const [ isImgError, setIsImgError ] = useState(false);
    const params = useParams();
    const pokeId = params.pokeId ? parseInt(params.pokeId, 10) : 0;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (pokeId) {
            dispatch(pokeCardAsync(pokeId)).then(({ payload }) => {
                setIsLoading(false);
                setPokeCard(payload);
            });
        }
    }, [ dispatch, pokeId ]);

    const imgSrc = useMemo(() => {
        const pokeImg = pokeCard?.sprites?.other['official-artwork']?.front_default;
        return isImgError || !pokeImg ? fallbackImg : pokeImg;
    }, [ isImgError, pokeCard ]);

    const handleImgError = useCallback(() => {
        if (!isImgError) {
            setIsImgError(true);
        }
    }, [ isImgError ]);

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPokeCard({ ...pokeCard as TPokeCard, name: e.target.value });
    }, [ pokeCard ]);

    const handleNameBlur = useCallback(() => {
        dispatch(updatePokeCard(pokeCard as TPokeCard));
    }, [ dispatch, pokeCard ]);

    return pokeCard && !isLoading ? (
        <Card sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <img
                    className="PokeCard__img"
                    src={ imgSrc }
                    onError={ handleImgError }
                    alt="pokemon"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <TextField
                        sx={{ marginBottom: '10px', fontFamily: 'Russo One' }}
                        label="Pokemon Name"
                        variant="standard"
                        value={ pokeCard?.name }
                        onChange={ handleNameChange }
                        onBlur={ handleNameBlur }
                    />
                    <div>
                        Height: { pokeCard.height / 10 }&thinsp;m, Weight: { pokeCard.weight / 10 }&thinsp;kg
                    </div>
                </CardContent>
            </Box>
        </Card>
    ) : null;
}

export default PokeCard;
