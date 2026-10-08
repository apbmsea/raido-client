import { FaqBlock } from '@shared/ui/FaqBlock';
import { FAQ_ITEMS } from '../model/faq';
import './FaqPage.scss';

const FaqPage = () => {
	return (
		<main className='faq-page'>
			<h1 className='faq-page__title'>Ответы на вопросы</h1>
			<section className='faq-page__content'>
				{FAQ_ITEMS.map(item => (
					<FaqBlock
						key={item.question}
						label={item.question}
						text={item.answer}
					/>
				))}
			</section>
		</main>
	);
};

export default FaqPage;
