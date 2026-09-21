import { Advantages } from '@widgets/Advantages';
import './HomePage.scss'
import { CatalogWidget } from '@widgets/CatalogWidget';
import { SliderWidget } from '@widgets/SliderWidget';
import { OffersWidget } from '@widgets/OffersWidget';

const HomePage = () => {
	return (
		<main className='home'>
			<SliderWidget />
			<CatalogWidget />
			<OffersWidget />
			<Advantages />
		</main>
	);
};

export default HomePage;
