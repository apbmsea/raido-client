import { CONTACTS } from '@shared/constants/contacts';
import { FaqBlock } from '@shared/ui/FaqBlock';
import { Reveal } from '@shared/ui/Reveal';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import { FAQ_ITEMS } from '../model/faq';
import './FaqPage.scss';

const FaqPage = () => {
	usePageTitle('Ответы на вопросы');

	return (
		<main className='faq-page'>
			<header className='faq-page__header'>
				<span className='faq-page__eyebrow'>Покупателям</span>
				<h1 className='faq-page__title'>Ответы на вопросы</h1>
				<p className='faq-page__lead'>
					Собрали то, о чём нас спрашивают чаще всего: заказ, оплата,
					возврат и гарантия.
				</p>
			</header>

			<section className='faq-page__content'>
				{FAQ_ITEMS.map(item => (
					<FaqBlock
						key={item.question}
						label={item.question}
						text={item.answer}
					/>
				))}
			</section>

			<Reveal as='aside' className='faq-page__help'>
				<div className='faq-page__help-text'>
					<h2 className='faq-page__help-title'>Не нашли ответ?</h2>
					<p>Напишите или позвоните — поможем разобраться.</p>
				</div>
				<div className='faq-page__contacts'>
					<a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
					<a href={CONTACTS.emailHref}>{CONTACTS.email}</a>
				</div>
			</Reveal>
		</main>
	);
};

export default FaqPage;
