import { CONTACTS } from '@shared/constants/contacts';
import './AboutCompanyPage.scss';

const AboutCompanyPage = () => {
	return (
		<main className='about-company-page'>
			<h1 className='about-company-page__title'>О компании</h1>

			<div className='about-company-page__text'>
				<p>
					Наша миссия — сделать современные технологии доступными для
					каждого. Мы верим, что качественная электроника должна быть не
					только функциональной, но и удобной в использовании. Мы
					стремимся предложить нашим клиентам лучшие решения для их
					повседневной жизни, будь то смартфоны, ноутбуки, бытовая техника
					или аксессуары.
				</p>

				<p>
					Мы ценим каждого клиента и стремимся обеспечить высокий уровень
					обслуживания. Наша команда поддержки всегда готова ответить на
					ваши вопросы, помочь с выбором товара и решить любые возникшие
					проблемы.
				</p>

				<p>
					Мы гарантируем безопасность ваших покупок. Наш сайт использует
					современные технологии шифрования для защиты личных данных
					клиентов.
				</p>

				<p>
					Мы постоянно обновляем наш ассортимент и следим за последними
					тенденциями в мире технологий.
				</p>
			</div>

			<div className='about-company-page__content'>
				<section className='about-company-page__section'>
					<h2 className='about-company-page__subtitle'>Адрес магазина</h2>

					<div className='about-company-page__address'>
						<h3 className='about-company-page__address-title'>
							{CONTACTS.address}
						</h3>
						<span>{CONTACTS.workingHours}</span>
					</div>

					<iframe
						className='about-company-page__map'
						src='https://yandex.ru/map-widget/v1/?um=constructor%3A65ae8a7ff85da3cbdd73afd4719b7d48e7f7ee249a2739c58fedc82cb240728e&amp;source=constructor'
						title='Карта с адресом магазина'
						loading='lazy'
						allowFullScreen
					/>
				</section>

				<section className='about-company-page__section'>
					<h2 className='about-company-page__subtitle'>Контакты</h2>

					<ul className='about-company-page__contacts'>
						<li>
							Телефон: <a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
						</li>
						<li>
							Эл. почта:{' '}
							<a href={CONTACTS.emailHref}>{CONTACTS.email}</a>
						</li>
						<li>Соц. сети: ссылка</li>
						<li>Соц. сети: ссылка</li>
						<li>Соц. сети: ссылка</li>
					</ul>
				</section>
			</div>
		</main>
	);
};

export default AboutCompanyPage;
