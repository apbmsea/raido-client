import { CONTACTS } from '@shared/constants/contacts';
import { FaqBlock } from '@shared/ui/FaqBlock';
import { JsonLd } from '@shared/ui/JsonLd';
import { Reveal } from '@shared/ui/Reveal';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import { FAQ_ITEMS } from '../model/faq';
import './FaqPage.scss';

const FAQ_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: FAQ_ITEMS.map(item => ({
		'@type': 'Question',
		name: item.question,
		acceptedAnswer: { '@type': 'Answer', text: item.answer }
	}))
};

const FaqPage = () => {
	usePageTitle('Ответы на вопросы', {
		description:
			'Ответы на частые вопросы покупателей «Райдо Сервис»: оформление заказа, оплата, отслеживание, возврат и гарантия.'
	});

	return (
		<main className='faq-page'>
			<JsonLd data={FAQ_SCHEMA} />
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
