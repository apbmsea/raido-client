import type { ReactNode } from 'react';
import { CONTACTS } from '@shared/constants/contacts';
import CatalogIcon from '@shared/icons/Catalog';
import MessageIcon from '@shared/icons/Message';
import PasswordIcon from '@shared/icons/Password';
import StarIcon from '@shared/icons/Star';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './AboutCompanyPage.scss';

interface Advantage {
	icon: ReactNode;
	title: string;
	text: string;
}

const ADVANTAGES: Advantage[] = [
	{
		icon: <StarIcon size={24} />,
		title: 'Технологии для каждого',
		text: 'Подбираем электронику, которая не только функциональна, но и удобна в использовании: смартфоны, ноутбуки, бытовую технику и аксессуары.'
	},
	{
		icon: <MessageIcon size={24} />,
		title: 'Поддержка на связи',
		text: 'Ответим на вопросы, поможем с выбором товара и решим любые возникшие проблемы.'
	},
	{
		icon: <PasswordIcon size={24} />,
		title: 'Безопасные покупки',
		text: 'Сайт использует современные технологии шифрования для защиты личных данных клиентов.'
	},
	{
		icon: <CatalogIcon size={24} />,
		title: 'Актуальный ассортимент',
		text: 'Постоянно обновляем каталог и следим за последними тенденциями в мире технологий.'
	}
];

const AboutCompanyPage = () => {
	usePageTitle('О компании', {
		description:
			'О компании «Райдо Сервис»: чем мы занимаемся, почему нас выбирают, адрес магазина в Екатеринбурге, режим работы и контакты.'
	});

	return (
		<main className='about-company-page'>
			<section className='about-company-page__hero'>
				<span className='about-company-page__eyebrow'>О компании</span>
				<h1 className='about-company-page__title'>
					Делаем современные технологии доступными для каждого
				</h1>
				<p className='about-company-page__lead'>
					Мы верим, что качественная электроника должна быть не только
					функциональной, но и удобной в использовании, и стремимся
					предложить лучшие решения для повседневной жизни.
				</p>
			</section>

			<section className='about-company-page__section'>
				<h2 className='about-company-page__subtitle'>
					Почему выбирают нас
				</h2>

				<ul className='about-company-page__advantages'>
					{ADVANTAGES.map(advantage => (
						<li
							className='about-company-page__advantage'
							key={advantage.title}
						>
							<span className='about-company-page__advantage-icon'>
								{advantage.icon}
							</span>
							<h3 className='about-company-page__advantage-title'>
								{advantage.title}
							</h3>
							<p className='about-company-page__advantage-text'>
								{advantage.text}
							</p>
						</li>
					))}
				</ul>
			</section>

			<section className='about-company-page__section'>
				<h2 className='about-company-page__subtitle'>Как нас найти</h2>

				<div className='about-company-page__location'>
					<iframe
						className='about-company-page__map'
						src='https://yandex.ru/map-widget/v1/?um=constructor%3A65ae8a7ff85da3cbdd73afd4719b7d48e7f7ee249a2739c58fedc82cb240728e&amp;source=constructor'
						title='Карта с адресом магазина'
						loading='lazy'
						allowFullScreen
					/>

					<dl className='about-company-page__contacts'>
						<div className='about-company-page__contact'>
							<dt>Адрес магазина</dt>
							<dd>
								<a
									href={CONTACTS.routeHref}
									target='_blank'
									rel='noopener noreferrer'
									title='Построить маршрут в Яндекс Картах'
								>
									{CONTACTS.address}
								</a>
							</dd>
						</div>
						<div className='about-company-page__contact'>
							<dt>Режим работы</dt>
							<dd>{CONTACTS.workingHours}</dd>
						</div>
						<div className='about-company-page__contact'>
							<dt>Телефон</dt>
							<dd>
								<a href={CONTACTS.phoneHref}>
									{CONTACTS.phone}
								</a>
							</dd>
						</div>
						<div className='about-company-page__contact'>
							<dt>Эл. почта</dt>
							<dd>
								<a href={CONTACTS.emailHref}>
									{CONTACTS.email}
								</a>
							</dd>
						</div>
					</dl>
				</div>
			</section>
		</main>
	);
};

export default AboutCompanyPage;
