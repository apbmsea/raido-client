import { Link } from 'react-router-dom';
import { Modal } from '@entities/modal';
import { CONTACTS } from '@shared/constants/contacts';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { FaqBlock } from '@shared/ui/FaqBlock';
import { Reveal } from '@shared/ui/Reveal';
import {
	BUSINESS_ADVANTAGES,
	BUSINESS_FAQ,
	BUSINESS_STEPS
} from '../model/businessConditions';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './BusinessConditionsPage.scss';

const BusinessConditionsPage = () => {
	usePageTitle('Условия для бизнеса');

	const dispatch = useAppDispatch();
	const isLogin = useAppSelector(state => state.user.isLogin);

	// Вошедшему регистрация не нужна — ведём его в личный кабинет
	const accountAction = isLogin ? (
		<Link className='business-page__cabinet' to='/profile'>
			Перейти в личный кабинет
		</Link>
	) : (
		<Button
			size='l'
			onClick={() => dispatch(Modal.actions.openModal('register'))}
		>
			Зарегистрировать компанию
		</Button>
	);

	return (
		<main className='business-page'>
			<section className='business-page__hero'>
				<span className='business-page__glow' aria-hidden='true' />
				<span
					className='business-page__glow business-page__glow--second'
					aria-hidden='true'
				/>

				<span className='business-page__eyebrow'>
					Корпоративным клиентам
				</span>
				<h1 className='business-page__title'>Условия для бизнеса</h1>
				<p className='business-page__lead'>
					Закупайте технику для компании с корпоративного аккаунта:
					подключайте сотрудников, оформляйте заказы на организацию и
					следите за ними в одном месте.
				</p>
				<div className='business-page__actions'>
					{accountAction}
					<a
						className='business-page__phone'
						href={CONTACTS.phoneHref}
					>
						{CONTACTS.phone}
					</a>
				</div>
			</section>

			<Reveal as='section' className='business-page__section'>
				<h2 className='business-page__subtitle'>
					Что получает компания
				</h2>

				<ul className='business-page__advantages'>
					{BUSINESS_ADVANTAGES.map(({ icon: Icon, title, text }) => (
						<li className='business-page__advantage' key={title}>
							<span className='business-page__icon'>
								<Icon size={26} />
							</span>
							<h3 className='business-page__card-title'>
								{title}
							</h3>
							<p className='business-page__card-text'>{text}</p>
						</li>
					))}
				</ul>
			</Reveal>

			<Reveal as='section' className='business-page__section'>
				<h2 className='business-page__subtitle'>Как начать работу</h2>

				<ol className='business-page__steps'>
					{BUSINESS_STEPS.map((step, index) => (
						<li className='business-page__step' key={step.title}>
							<span className='business-page__number'>
								{index + 1}
							</span>
							<h3 className='business-page__card-title'>
								{step.title}
							</h3>
							<p className='business-page__card-text'>
								{step.text}
							</p>
						</li>
					))}
				</ol>
			</Reveal>

			<Reveal as='section' className='business-page__section'>
				<h2 className='business-page__subtitle'>Частые вопросы</h2>

				<div className='business-page__faq'>
					{BUSINESS_FAQ.map(item => (
						<FaqBlock
							key={item.question}
							label={item.question}
							text={item.answer}
						/>
					))}
				</div>
			</Reveal>

			<Reveal as='aside' className='business-page__cta'>
				<div className='business-page__cta-text'>
					<h2 className='business-page__subtitle'>
						Обсудим условия для вашей компании
					</h2>
					<p>
						Позвоните или напишите нам — расскажем о сотрудничестве
						и поможем с первым заказом.
					</p>
				</div>
				<div className='business-page__contacts'>
					<a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
					<a href={CONTACTS.emailHref}>{CONTACTS.email}</a>
				</div>
			</Reveal>
		</main>
	);
};

export default BusinessConditionsPage;
