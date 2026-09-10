import { FavoriteList } from '@entities/favorite';

const FavoritePage = () => {
	return (
		<main>
			<h2>Избранное</h2>
			<FavoriteList />
            <h2>ВАМ МОЖЕТ ПОНРАВИТЬСЯ БЛОКК</h2>
		</main>
	);
};

export default FavoritePage;
