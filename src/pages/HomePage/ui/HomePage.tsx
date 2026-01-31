import { Advantages } from '@widgets/Advantages';
import './HomePage.scss'
import { CatalogWidget } from '@widgets/CatalogWidget';

const HomePage = () => {
	return (
		<main className='home'>
			<CatalogWidget />
			<Advantages />
		</main>
	);
};

export default HomePage;
