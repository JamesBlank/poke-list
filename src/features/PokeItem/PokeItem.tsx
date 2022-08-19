import { useCallback, useMemo, useState } from 'react';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import fallbackImg from '../../unknown.png';

const POKE_IMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const POKE_IMG_ANIMATED_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/';

const PokeItem = ({ pokeIndex, pokeName }: { pokeIndex?: string; pokeName: string}) => {
    const [ isStaticImgError, setIsStaticImgError ] = useState(false);
    const [ isAnimatedImgError, setIsAnimatedImgeError ] = useState(false);
    const [ isMouseOver, setIsMouseOver ] = useState(false);

    const handleError = useCallback(() => {
        if (!isStaticImgError && !isMouseOver) {
            setIsStaticImgError(true);
        }
        if (!isAnimatedImgError && isMouseOver) {
            setIsAnimatedImgeError(true);
        }
    }, [ isAnimatedImgError, isStaticImgError, isMouseOver ]);

    const handleMouseEnter = useCallback(() => {
        setIsMouseOver(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsMouseOver(false);
    }, []);

    const imgSrc = useMemo(() => {
        const staticUrl = POKE_IMG_URL + pokeIndex + '.png';
        const animatedUrl = POKE_IMG_ANIMATED_URL + pokeIndex + '.gif';

        if (isStaticImgError && !isMouseOver) {
            return fallbackImg;
        }
        if (isAnimatedImgError && isMouseOver) {
            return isStaticImgError ? fallbackImg : staticUrl;
        }

        return isMouseOver ? animatedUrl : staticUrl;
    }, [ isAnimatedImgError, isStaticImgError, isMouseOver, pokeIndex ]);

    return (
        <ListItemButton onMouseEnter={ handleMouseEnter } onMouseLeave={ handleMouseLeave }>
            <ListItemAvatar className="PokeItem__avatarWrapper">
                <img
                    className="PokeItem__avatar"
                    src={ imgSrc }
                    onError={ handleError }
                    alt="pokemon"
                />
            </ListItemAvatar>
            <div className="PokeItem__text">{ pokeName }</div>
        </ListItemButton>
    );
}

export default PokeItem;
