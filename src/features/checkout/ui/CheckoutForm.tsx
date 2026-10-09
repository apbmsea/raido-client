import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { Manager } from '@entities/manager';
import { Order } from '@entities/order';
import type { UserType } from '@entities/user';
import { CONTACTS } from '@shared/constants/contacts';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
import { Input } from '@shared/ui/Input';
import { Tabs, type TabItem } from '@shared/ui/Tabs';
import { TextArea } from '@shared/ui/TextArea';
import { isValidBirthDate, toDateInputValue } from '@shared/utils/birthDate';
import { formatPhone, normalizePhone, PHONE_LENGTH } from '@shared/utils/phone';
import { plural } from '@shared/utils/plural';
import {
	buildShippingAddress,
	type AddressFields
} from '../lib/buildShippingAddress';
import './CheckoutForm.scss';

type DeliveryMethod = 'delivery' | 'pickup';

const DELIVERY_TABS: TabItem<DeliveryMethod>[] = [
	{ id: 'delivery', label: 'Доставка' },
	{ id: 'pickup', label: 'Самовывоз' }
];

interface BuyerFields {
	surname: string;
	name: string;
	patronymic: string;
	phone: string;
	date_of_birth: string;
	inn: string;
	organization_name: string;
	post: string;
}

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

const EMPTY_ADDRESS: AddressFields = {
	address: '',
	apartment: '',
	entrance: '',
	floor: '',
	intercom: ''
};

type CheckoutFormProps = {
	user: UserType;
	cartItemIds: number[];
};

const CheckoutForm = ({ user, cartItemIds }: CheckoutFormProps) => {
	const dispatch = useAppDispatch();
	const organizations = useAppSelector(state => state.manager.organizations);
	const { isFetching, errors } = useAppSelector(state => state.order);
	const isCorporate = user.is_corporate;

	const [buyer, setBuyer] = useState<BuyerFields>(() => ({
		surname: user.surname || '',
		name: user.name || '',
		patronymic: user.patronymic || '',
		phone: normalizePhone(user.phone),
		date_of_birth: toDateInputValue(user.date_of_birth),
		inn: user.inn ? String(user.inn) : '',
		organization_name: user.organization_name || '',
		post: user.post || ''
	}));
	const [address, setAddress] = useState(EMPTY_ADDRESS);
	const [deliveryMethod, setDeliveryMethod] =
		useState<DeliveryMethod>('delivery');
	const [organizationId, setOrganizationId] = useState<number | null>(null);
	const [comment, setComment] = useState('');
	const [commentDelivery, setCommentDelivery] = useState('');
	const [isTermsAccepted, setIsTermsAccepted] = useState(false);
	const [useBonus, setUseBonus] = useState(false);
	const [isValidated, setIsValidated] = useState(false);

	const isDelivery = deliveryMethod === 'delivery';

	const phoneError =
		isValidated &&
		buyer.phone.length > 0 &&
		buyer.phone.length !== PHONE_LENGTH
			? 'Введите 10 цифр без кода страны'
			: '';
	const dateError =
		isValidated && !isValidBirthDate(buyer.date_of_birth)
			? 'Укажите существующую дату не позже сегодняшнего дня'
			: '';

	const otherErrors = Object.entries(errors).filter(
		([key]) => !FIELD_ERROR_KEYS.includes(key)
	);

	useEffect(() => {
		dispatch(Order.actions.clearAllErrors());
	}, [dispatch]);

	useEffect(() => {
		if (!isCorporate) {
			dispatch(Manager.actions.getManagedOrganizationsRequest());
		}
	}, [isCorporate, dispatch]);

	const clearError = (name: string) => {
		if (errors[name]) dispatch(Order.actions.clearError(name));
	};

	const handleBuyerChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		clearError(name);
		setBuyer(prev => ({
			...prev,
			[name]:
				name === 'phone'
					? value.replace(/\D/g, '').slice(0, PHONE_LENGTH)
					: name === 'inn'
						? value.replace(/\D/g, '')
						: value
		}));
	};

	const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		clearError('shipping_address');
		setAddress(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsValidated(true);

		const isPhoneValid =
			buyer.phone.length === 0 || buyer.phone.length === PHONE_LENGTH;
		if (!isPhoneValid || !isValidBirthDate(buyer.date_of_birth)) return;

		dispatch(
			Order.actions.createOrderRequest({
				user: {
					surname: buyer.surname,
					name: buyer.name,
					patronymic: buyer.patronymic,
					phone: buyer.phone,
					date_of_birth: buyer.date_of_birth,
					...(isCorporate && {
						inn: Number(buyer.inn),
						organization_name: buyer.organization_name,
						post: buyer.post
					})
				},
				...(!isCorporate &&
					organizationId !== null && {
						organization_id: organizationId
					}),
				shipping: isDelivery,
				shipping_address: isDelivery
					? buildShippingAddress(address)
					: '',
				cart_item_ids: cartItemIds,
				comment,
				comment_delivery: isDelivery ? commentDelivery : '',
				terms: isTermsAccepted,
				use_bonus: useBonus
			})
		);
	};

	return (
		<form className='checkout-form' onSubmit={handleSubmit}>
			<fieldset className='checkout-form__section'>
				<legend className='checkout-form__title'>
					Данные покупателя
				</legend>
				<div className='checkout-form__grid'>
					<Input
						label='Фамилия'
						placeholder='Фамилия'
						name='surname'
						autoComplete='family-name'
						value={buyer.surname}
						onChange={handleBuyerChange}
						error={errors.surname?.message}
					/>
					<Input
						label='Имя'
						placeholder='Имя'
						name='name'
						autoComplete='given-name'
						value={buyer.name}
						onChange={handleBuyerChange}
						error={errors.name?.message}
					/>
					<Input
						label='Отчество'
						placeholder='Отчество'
						name='patronymic'
						autoComplete='additional-name'
						value={buyer.patronymic}
						onChange={handleBuyerChange}
						error={errors.patronymic?.message}
					/>
					<Input
						label='Телефон'
						placeholder='999 999-99-99'
						startAdornment='+7'
						name='phone'
						type='tel'
						inputMode='numeric'
						autoComplete='tel-national'
						value={formatPhone(buyer.phone)}
						onChange={handleBuyerChange}
						error={phoneError || errors.phone?.message}
					/>
					<Input
						label='Дата рождения'
						type='date'
						name='date_of_birth'
						autoComplete='bday'
						value={buyer.date_of_birth}
						onChange={handleBuyerChange}
						max={new Date().toISOString().slice(0, 10)}
						error={dateError || errors.date_of_birth?.message}
					/>
					{isCorporate && (
						<>
							<Input
								label='Название организации'
								placeholder='Название организации'
								name='organization_name'
								autoComplete='organization'
								value={buyer.organization_name}
								onChange={handleBuyerChange}
								error={errors.organization_name?.message}
							/>
							<Input
								label='ИНН'
								placeholder='ИНН'
								name='inn'
								inputMode='numeric'
								maxLength={12}
								value={buyer.inn}
								onChange={handleBuyerChange}
								error={errors.inn?.message}
							/>
							<Input
								label='Должность'
								placeholder='Должность'
								name='post'
								autoComplete='organization-title'
								value={buyer.post}
								onChange={handleBuyerChange}
								error={errors.post?.message}
							/>
						</>
					)}
				</div>
			</fieldset>

			{!isCorporate && organizations.length > 0 && (
				<fieldset className='checkout-form__section'>
					<legend className='checkout-form__title'>
						Заказ от организации
					</legend>
					<div className='checkout-form__options'>
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
				</fieldset>
			)}

			<fieldset className='checkout-form__section'>
				<legend className='checkout-form__title'>
					Способ получения
				</legend>
				<Tabs<DeliveryMethod>
					items={DELIVERY_TABS}
					activeTab={deliveryMethod}
					onChange={setDeliveryMethod}
				/>
				{isDelivery ? (
					<>
						<Input
							label='Адрес'
							placeholder='Город, улица, дом'
							name='address'
							autoComplete='street-address'
							value={address.address}
							onChange={handleAddressChange}
							error={errors.shipping_address?.message}
							required
						/>
						<div className='checkout-form__grid'>
							<Input
								label='Квартира'
								placeholder='Квартира'
								name='apartment'
								value={address.apartment}
								onChange={handleAddressChange}
							/>
							<Input
								label='Подъезд'
								placeholder='Подъезд'
								name='entrance'
								value={address.entrance}
								onChange={handleAddressChange}
							/>
							<Input
								label='Этаж'
								placeholder='Этаж'
								name='floor'
								value={address.floor}
								onChange={handleAddressChange}
							/>
							<Input
								label='Домофон'
								placeholder='Домофон'
								name='intercom'
								value={address.intercom}
								onChange={handleAddressChange}
							/>
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
					<div className='checkout-form__pickup'>
						<span className='checkout-form__pickup-label'>
							Пункт выдачи
						</span>
						<a
							className='checkout-form__pickup-address'
							href={CONTACTS.routeHref}
							target='_blank'
							rel='noopener noreferrer'
							title='Построить маршрут в Яндекс Картах'
						>
							{CONTACTS.address}
						</a>
						<span>{CONTACTS.workingHours}</span>
					</div>
				)}
			</fieldset>

			{user.bonus_balance > 0 && (
				<fieldset className='checkout-form__section'>
					<legend className='checkout-form__title'>Баллы</legend>
					<Checkbox
						name='use_bonus'
						label={`Списать ${user.bonus_balance} ${plural(user.bonus_balance, ['балл', 'балла', 'баллов'])}`}
						checked={useBonus}
						onChange={e => setUseBonus(e.target.checked)}
					/>
				</fieldset>
			)}

			<fieldset className='checkout-form__section'>
				<legend className='checkout-form__title'>
					Комментарий к заказу
				</legend>
				<TextArea
					placeholder='Пожелания к заказу — необязательно'
					aria-label='Комментарий к заказу'
					name='comment'
					value={comment}
					onChange={e => {
						setComment(e.target.value);
						clearError('comment');
					}}
					error={errors.comment?.message}
				/>
			</fieldset>

			<div className='checkout-form__footer'>
				<Checkbox
					name='terms'
					label='Принимаю условия обработки персональных данных'
					checked={isTermsAccepted}
					onChange={e => setIsTermsAccepted(e.target.checked)}
					required
				/>

				{otherErrors.length > 0 && (
					<div className='checkout-form__errors' role='alert'>
						{otherErrors.map(([key, error]) => (
							<p key={key}>{error.message}</p>
						))}
					</div>
				)}

				<Button
					type='submit'
					size='l'
					className='checkout-form__submit'
					loading={isFetching}
				>
					Оформить заказ
				</Button>
			</div>
		</form>
	);
};

export default CheckoutForm;
