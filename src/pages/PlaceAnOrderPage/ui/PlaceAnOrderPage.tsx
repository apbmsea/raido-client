import { Input } from '@shared/ui/Input';
import './PlaceAnOrderPage.scss';
import { Tabs, type TabItem } from '@shared/ui/Tabs/ui/Tabs';
import { useEffect, useState, type ChangeEvent } from 'react';
import { TextArea } from '@shared/ui/TextArea';
import { Checkbox } from '@shared/ui/Checkbox';
import { Button } from '@shared/ui/Button';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Order, OrderItemsWidget } from '@entities/order';
import { Manager } from '@entities/manager';
import { useSearchParams } from 'react-router-dom';
import { formatPhone, normalizePhone, PHONE_LENGTH } from '@shared/utils/phone';
import { isValidBirthDate, toDateInputValue } from '@shared/utils/birthDate';

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

const today = new Date().toISOString().slice(0, 10);

// Ошибки с этими ключами выводятся под своими полями, остальные — общим списком
const FIELD_ERROR_KEYS = [
	'surname',
	'name',
	'patronymic',
	'phone',
	'date_of_birth',
	'organization_name',
	'inn',
	'post',
	'shipping_address',
	'comment',
	'comment_delivery'
];

const PlaceAnOrderPage = () => {
	const dispacth = useAppDispatch();
	const { user } = useAppSelector(state => state.user);
	const organizations = useAppSelector(state => state.manager.organizations);
	const { isFetching, errors } = useAppSelector(state => state.order);
	const isCorporate = user?.is_corporate ?? false;
	const [organizationId, setOrganizationId] = useState<number | null>(null);
	const [validationErrors, setValidationErrors] = useState({
		phone: '',
		date_of_birth: ''
	});
	const [comment, setComment] = useState('');
	const [commentDelivery, setCommentDelivery] = useState('');
	const [terms, setTerms] = useState(false);
	const [useBonus, setUseBonus] = useState(false);

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
				phone: normalizePhone(user.phone),
				date_of_birth: toDateInputValue(user.date_of_birth),
				inn: user.inn || 0,
				organization_name: user.organization_name || '',
				post: user.post || '',
				shipping_adress: ''
			});
		}
	}, [user]);

	useEffect(() => {
		if (user && !user.is_corporate) {
			dispacth(Manager.actions.getManagedOrganizationsRequest());
		}
	}, [user, dispacth]);

	useEffect(() => {
		dispacth(Order.actions.clearAllErrors());
	}, [dispacth]);

	const clearError = (name: string) => {
		if (errors[name]) dispacth(Order.actions.clearError(name));
	};

	const otherErrors = Object.entries(errors).filter(
		([key]) => !FIELD_ERROR_KEYS.includes(key)
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		clearError(name === 'shipping_adress' ? 'shipping_address' : name);
		setFormData(prev => ({
			...prev,
			[name]:
				name === 'phone'
					? value.replace(/\D/g, '').slice(0, PHONE_LENGTH)
					: value
		}));
		if (name === 'phone' || name === 'date_of_birth') {
			setValidationErrors(prev => ({ ...prev, [name]: '' }));
		}
	};

	const [activeMethod, setActiveMethod] =
		useState<DeliveryMethod>('delivery');

	const tabItems: TabItem<DeliveryMethod>[] = [
		{ id: 'delivery', label: 'Доставка' },
		{ id: 'pickup', label: 'Самовывоз' }
	];

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const nextErrors = {
			phone:
				formData.phone.length > 0 &&
				formData.phone.length !== PHONE_LENGTH
					? 'Введите 10 цифр без кода страны'
					: '',
			date_of_birth: isValidBirthDate(formData.date_of_birth)
				? ''
				: 'Укажите существующую дату не позже сегодняшнего дня'
		};
		setValidationErrors(nextErrors);
		if (nextErrors.phone || nextErrors.date_of_birth) return;

		dispacth(
			Order.actions.createOrderRequest({
				user: {
					surname: formData.surname,
					name: formData.name,
					patronymic: formData.patronymic,
					phone: formData.phone,
					date_of_birth: formData.date_of_birth,
					...(isCorporate && {
						inn: formData.inn,
						organization_name: formData.organization_name,
						post: formData.post
					})
				},
				...(!isCorporate &&
					organizationId !== null && {
						organization_id: organizationId
					}),
				shipping: activeMethod === 'delivery',
				shipping_address:
					activeMethod === 'delivery' ? formData.shipping_adress : '',
				cart_item_ids: cartItemIds,
				comment,
				comment_delivery:
					activeMethod === 'delivery' ? commentDelivery : '',
				terms,
				use_bonus: useBonus
			})
		);
	};

	return (
		<main className='place-an-order-page'>
			<h1 className='place-an-order-page__title'>Оформление заказа</h1>
			<div className='place-an-order-page__content'>
				<OrderItemsWidget />
				<form
					className='place-an-order-page__form'
					onSubmit={submitForm}
				>
					<div className='place-an-order-page__user-form'>
						<h2>Данные покупателя</h2>
						<Input
							label='Фамилия'
							placeholder='Фамилия'
							name='surname'
							value={formData.surname}
							onChange={handleChange}
							error={errors.surname?.message}
							// disabled={isFetch}
						/>
						<Input
							label='Имя'
							placeholder='Имя'
							name='name'
							value={formData.name}
							onChange={handleChange}
							error={errors.name?.message}
							// disabled={isFetch}
						/>
						<Input
							label='Отчество'
							placeholder='Отчество'
							name='patronymic'
							value={formData.patronymic}
							onChange={handleChange}
							error={errors.patronymic?.message}
							// disabled={isFetch}
						/>
						<Input
							label='Телефон'
							placeholder='999 999-99-99'
							startAdornment='+7'
							name='phone'
							type='tel'
							inputMode='numeric'
							value={formatPhone(formData.phone)}
							onChange={handleChange}
							error={
								validationErrors.phone || errors.phone?.message
							}
							// disabled={isFetch}
						/>
						<Input
							label='Дата рождения'
							type='date'
							name='date_of_birth'
							value={formData.date_of_birth}
							onChange={handleChange}
							max={today}
							error={
								validationErrors.date_of_birth ||
								errors.date_of_birth?.message
							}
							// disabled={isFetch}
						/>
						{isCorporate && (
							<>
								<Input
									label='Название организации'
									placeholder='Название организации'
									name='organization_name'
									value={formData.organization_name}
									onChange={handleChange}
									error={errors.organization_name?.message}
									// disabled={isFetch}
								/>
								<Input
									label='ИНН'
									placeholder='ИНН'
									name='inn'
									value={formData.inn}
									onChange={handleChange}
									error={errors.inn?.message}
									// disabled={isFetch}
								/>
								<Input
									label='Должность'
									placeholder='Должность'
									name='post'
									value={formData.post}
									onChange={handleChange}
									error={errors.post?.message}
									// disabled={isFetch}
								/>
							</>
						)}
					</div>
					{!isCorporate && organizations.length > 0 && (
						<div className='place-an-order-page__section'>
							<h2>Заказ от организации</h2>
							<div className='place-an-order-page__organizations'>
								{organizations.map(organization => (
									<Checkbox
										key={organization.organization_id}
										name='organization_id'
										label={`${organization.organization_name} (ИНН ${organization.inn})`}
										checked={
											organizationId ===
											organization.organization_id
										}
										onChange={e =>
											setOrganizationId(
												e.target.checked
													? organization.organization_id
													: null
											)
										}
									/>
								))}
							</div>
						</div>
					)}
					<div className='place-an-order-page__section'>
						<h2>Способ получения</h2>
						<Tabs<DeliveryMethod>
							items={tabItems}
							activeTab={activeMethod}
							onChange={id => setActiveMethod(id)}
							className='place-an-order-page__tabs'
						/>
						{activeMethod === 'delivery' ? (
							<>
								<h3>Доставка</h3>
								<Input
									label='Адрес'
									placeholder='Адрес'
									name='shipping_adress'
									value={formData.shipping_adress}
									onChange={handleChange}
									error={errors.shipping_address?.message}
								/>
								<div className='place-an-order-page__address-fields'>
									<div className='place-an-order-page__address-row'>
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
									<div className='place-an-order-page__address-row'>
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
									name='comment_delivery'
									value={commentDelivery}
									onChange={e => {
										setCommentDelivery(e.target.value);
										clearError('comment_delivery');
									}}
									error={errors.comment_delivery?.message}
								/>
							</>
						) : (
							<div className='place-an-order-page__delivery-location'>
								<h3>г. Екатеринбург, ул. Свердлова 22 </h3>
								<span>Ежедневно с 10:00 до 22:00</span>
							</div>
						)}
					</div>
					{user && user.bonus_balance > 0 && (
						<div className='place-an-order-page__section'>
							<h2>Баллы</h2>
							<Checkbox
								id='coins'
								name='use_bonus'
								label={`Списать ${user?.bonus_balance} баллов`}
								checked={useBonus}
								onChange={e => setUseBonus(e.target.checked)}
							/>
						</div>
					)}
					<TextArea
						label='Комментарий к заказу'
						placeholder='Комментарий к заказу'
						name='comment'
						value={comment}
						onChange={e => {
							setComment(e.target.value);
							clearError('comment');
						}}
						error={errors.comment?.message}
					/>
					<Checkbox
						id='terms'
						name='terms'
						label='Принимаю условия обработки персональных данных'
						checked={terms}
						onChange={e => setTerms(e.target.checked)}
						required
					/>
					{otherErrors.length > 0 && (
						<div
							className='place-an-order-page__errors'
							role='alert'
						>
							{otherErrors.map(([key, error]) => (
								<p key={key}>{error.message}</p>
							))}
						</div>
					)}
					<Button type='submit' loading={isFetching}>
						Оформить заказ
					</Button>
				</form>
			</div>
		</main>
	);
};

export default PlaceAnOrderPage;
