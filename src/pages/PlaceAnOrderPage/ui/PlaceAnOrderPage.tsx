import { Input } from '@shared/ui/Input';
import './PlaceAnOrderPage.scss';
import { Tabs, type TabItem } from '@shared/ui/Tabs/ui/Tabs';
import { useEffect, useState, type ChangeEvent } from 'react';
import { TextArea } from '@shared/ui/TextArea';
import { Checkbox } from '@shared/ui/Checkbox';
import { Button } from '@shared/ui/Button';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Order, OrderItemsWidget } from '@entities/order';
import { useSearchParams } from 'react-router-dom';

type DeliveryMethod = 'delivery' | 'pickup';

interface FormFields {
	surname: string;
	name: string;
	patronymic: string;
	phone: string;
	date_of_birth: string;
	inn: number;
	organization_name: string;
	post: string;
	shipping_adress: string;
}

const PlaceAnOrderPage = () => {
	const dispacth = useAppDispatch();
	const { user } = useAppSelector(state => state.user);

	const [searchParams] = useSearchParams();

	const cartItemIds =
		searchParams.get('ids')?.split(',').map(Number).filter(Boolean) ?? [];

	const [formData, setFormData] = useState<FormFields>({
		surname: '',
		name: '',
		patronymic: '',
		phone: '',
		date_of_birth: '',
		inn: 0,
		organization_name: '',
		post: '',
		shipping_adress: ''
	});

	useEffect(() => {
		if (user) {
			setFormData({
				surname: user.surname || '',
				name: user.name || '',
				patronymic: user.patronymic || '',
				phone: user.phone || '',
				date_of_birth: user.date_of_birth || '',
				inn: user.inn || 0,
				organization_name: user.organization_name || '',
				post: user.post || '',
				shipping_adress: ''
			});
		}
	}, [user]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const [activeMethod, setActiveMethod] =
		useState<DeliveryMethod>('delivery');

	const tabItems: TabItem<DeliveryMethod>[] = [
		{ id: 'delivery', label: 'Доставка' },
		{ id: 'pickup', label: 'Самовывоз' }
	];

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		dispacth(
			Order.actions.createOrderRequest({
				user: {
					surname: formData.surname,
					name: formData.name,
					patronymic: formData.patronymic,
					phone: formData.phone,
					date_of_birth: formData.date_of_birth,
					inn: formData.inn,
					organization_name: formData.organization_name,
					post: formData.post
				},
				shipping: activeMethod === 'delivery',
				shipping_address:
					activeMethod === 'delivery' ? formData.shipping_adress : '',
				cart_item_ids: cartItemIds
			})
		);
	};

	return (
		<main className='place-an-order-page'>
			<h1 className='place-an-order-page__title'>Оформление заказа</h1>
			<div className='place-an-order-page__content'>
				<OrderItemsWidget />
				<div
					style={{
						width: '626px',
						display: 'flex',
						flexDirection: 'column',
						gap: '40px'
					}}
				>
					<div className='place-an-order-page__user-form'>
						<h2>Данные покупателя</h2>
						<Input
							label='Фамилия'
							placeholder='Фамилия'
							name='surname'
							value={formData.surname}
							onChange={handleChange}
							// disabled={isFetch}
						/>
						<Input
							label='Имя'
							placeholder='Имя'
							name='name'
							value={formData.name}
							onChange={handleChange}
							// disabled={isFetch}
						/>
						<Input
							label='Отчество'
							placeholder='Отчество'
							name='patronymic'
							value={formData.patronymic}
							onChange={handleChange}
							// disabled={isFetch}
						/>
						<Input
							label='Телефон'
							placeholder='+7 (999) 999-99-99'
							name='phone'
							value={formData.phone}
							onChange={handleChange}
							// disabled={isFetch}
						/>
						<Input
							label='Дата рождения'
							placeholder='Дата рождения'
							name='date_of_birth'
							value={formData.date_of_birth}
							onChange={handleChange}
							// disabled={isFetch}
						/>
						<Input
							label='Название организации'
							placeholder='Название организации'
							name='organization_name'
							value={formData.organization_name}
							onChange={handleChange}
							// disabled={isFetch}
						/>
						<Input
							label='ИНН'
							placeholder='ИНН'
							name='inn'
							value={formData.inn}
							onChange={handleChange}
							// disabled={isFetch}
						/>
						<Input
							label='POST POST POST'
							placeholder='POST POST POST'
							name='post'
							value={formData.post}
							onChange={handleChange}
							// disabled={isFetch}
						/>
					</div>
					<div>
						<h2>Способ получения</h2>
						<Tabs<DeliveryMethod>
							items={tabItems}
							activeTab={activeMethod}
							onChange={id => setActiveMethod(id)} // Переключаем стейт
							className='order-tabs'
						/>
						{activeMethod === 'delivery' ? (
							<>
								Доставка
								<Input
									label='Адрес'
									placeholder='Адрес'
									name='shipping_adress'
									value={formData.shipping_adress}
									onChange={handleChange}
								/>
								<div>
									<div>
										<Input
											label='Квартира'
											placeholder='Квартира'
											name='name'
										/>
										<Input
											label='Подьезд'
											placeholder='Подьезд'
											name='name'
										/>
									</div>
									<div>
										<Input
											label='Этаж'
											placeholder='Этаж'
											name='name'
										/>
										<Input
											label='Домофон'
											placeholder='Домофон'
											name='name'
										/>
									</div>
								</div>
								<TextArea
									label='Комментарий к доставке'
									placeholder='Комментарий к доставке'
								/>
							</>
						) : (
							<>Самовывоз</>
						)}
					</div>
					<div>
						<h2>Баллы</h2>
						<Checkbox
							id='terms'
							name='terms'
							label='Начислить value'
						/>
						<Checkbox
							id='terms'
							name='terms'
							label='Списать value'
						/>
					</div>
					<TextArea
						label='Комментарий к заказу'
						placeholder='Комментарий к заказу'
					/>
					<Checkbox
						id='terms'
						name='terms'
						label='Принимаю условия обработки персональных данных'
					/>
					<Button onClick={submitForm}>Оформить заказ</Button>
				</div>
			</div>
		</main>
	);
};

export default PlaceAnOrderPage;
