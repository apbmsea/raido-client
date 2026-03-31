import { CatalogList } from '../features/catalogList';
import { Filters } from '../features/filters';
import { Pagination } from '../features/pagination';
import './CatalogPage.scss';

const CatalogPage = () => {
	return (
		<main className='catalog'>
			Каталог {'-->'} Категория товаров {'-->'} Телевизоры
			<h1>Телевизоры</h1>
			<div style={{ display: 'flex', gap: '26px', width: '100%' }}>
				<Filters />
				<div>
					<div style={{ background: '#f3f3f3', width: "100%", height: "45px", borderRadius: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", paddingInline: "25px"}}>
						<div>Сортировка</div>
						<div>Вид</div>
					</div>
					<CatalogList />
					<Pagination />
				</div>
			</div>
		</main>
	);
};

export default CatalogPage;
