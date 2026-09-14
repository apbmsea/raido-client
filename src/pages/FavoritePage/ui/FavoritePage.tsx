import { FavoriteList } from '@entities/favorite';
import './FavoritePage.scss';
import { OffersWidget } from '@widgets/OffersWidget';

const FavoritePage = () => {
	return (
		<main className='favorite-page'>
			<h1 className='favorite-page__title'>Избранное</h1>
			<FavoriteList />
			<OffersWidget />
		</main>
	);
};

export default FavoritePage;
