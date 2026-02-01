import { Advantages } from '@widgets/Advantages';
import './HomePage.scss'
import { CatalogWidget } from '@widgets/CatalogWidget';
import { SliderWidget } from '@widgets/SliderWidget';

const HomePage = () => {
	return (
		<main className='home'>
			<SliderWidget />
			<CatalogWidget />
			<Advantages />
		</main>
	);
};

export default HomePage;
