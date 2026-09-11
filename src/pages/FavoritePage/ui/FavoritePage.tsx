import { FavoriteList } from '@entities/favorite';
import './FavoritePage.scss';

const FavoritePage = () => {
	return (
		<main className='favorite-page'>
			<h1 className='favorite-page__title'>Избранное</h1>
			<FavoriteList />
            <h2>ВАМ МОЖЕТ ПОНРАВИТЬСЯ БЛОКК</h2>
		</main>
	);
};

export default FavoritePage;
