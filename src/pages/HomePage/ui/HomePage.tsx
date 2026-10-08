import { Advantages } from '@widgets/Advantages';
import { CatalogWidget } from '@widgets/CatalogWidget';
import { OffersWidget } from '@widgets/OffersWidget';
import { SliderWidget } from '@widgets/SliderWidget';
import './HomePage.scss';

const HomePage = () => {
	return (
		<main className='home-page'>
			<h1 className='visually-hidden'>Райдо Сервис</h1>
			<SliderWidget />
			<CatalogWidget />
			<OffersWidget />
			<Advantages />
		</main>
	);
};

export default HomePage;
