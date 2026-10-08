import {
	COMPLEX_GOODS_RIGHTS,
	LATE_CLAIM_CASES,
	WARRANTY_RIGHTS
} from '../model/warranty';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './WarrantyPage.scss';

const WarrantyPage = () => {
	usePageTitle('Гарантия');

	return (
		<main className='warranty-page'>
			<section className='warranty-page__hero'>
				<span className='warranty-page__eyebrow'>Покупателям</span>
				<h1 className='warranty-page__title'>Гарантия</h1>
				<p className='warranty-page__lead'>
					Если в купленном вами товаре в течение установленного
					гарантийного срока обнаружены недостатки, вы сами выбираете,
					как решить вопрос.
				</p>
			</section>

			<section className='warranty-page__section'>
				<h2 className='warranty-page__subtitle'>
					Что вы вправе потребовать
				</h2>

				<ol className='warranty-page__rights'>
					{WARRANTY_RIGHTS.map((right, index) => (
						<li className='warranty-page__right' key={right.title}>
							<span className='warranty-page__number'>
								{index + 1}
							</span>
							<h3 className='warranty-page__card-title'>
								{right.title}
							</h3>
							<p className='warranty-page__card-text'>
								{right.text}
							</p>
						</li>
					))}
				</ol>
			</section>

			<section className='warranty-page__section'>
				<h2 className='warranty-page__subtitle'>
					Технически сложные товары
				</h2>

				<div className='warranty-page__complex'>
					<div className='warranty-page__term'>
						<span className='warranty-page__term-value'>15</span>
						<span className='warranty-page__term-unit'>дней</span>
						<p className='warranty-page__term-text'>
							со дня передачи вам товара — срок, в который можно
							предъявить эти требования
						</p>
					</div>

					<ul className='warranty-page__options'>
						{COMPLEX_GOODS_RIGHTS.map(right => (
							<li
								className='warranty-page__option'
								key={right.title}
							>
								<h3 className='warranty-page__card-title'>
									{right.title}
								</h3>
								<p className='warranty-page__card-text'>
									{right.text}
								</p>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className='warranty-page__section'>
				<div className='warranty-page__heading'>
					<h2 className='warranty-page__subtitle'>
						Если 15 дней уже прошло
					</h2>
					<p className='warranty-page__description'>
						Требования о возврате денег или замене технически
						сложного товара подлежат удовлетворению в одном из
						следующих случаев.
					</p>
				</div>

				<ul className='warranty-page__cases'>
					{LATE_CLAIM_CASES.map(item => (
						<li className='warranty-page__case' key={item.title}>
							<h3 className='warranty-page__card-title'>
								{item.title}
							</h3>
							<p className='warranty-page__card-text'>
								{item.text}
							</p>
						</li>
					))}
				</ul>
			</section>

			<aside className='warranty-page__note'>
				<span className='warranty-page__note-mark' aria-hidden='true'>
					!
				</span>
				<div className='warranty-page__note-body'>
					<h2 className='warranty-page__card-title'>
						Уценённые и бывшие в употреблении товары
					</h2>
					<p className='warranty-page__card-text'>
						Если вы приобрели уценённый или бывший в употреблении
						товар ненадлежащего качества и были заранее в письменной
						форме предупреждены о недостатках, из-за которых
						произошла уценка, претензии по таким недостаткам не
						принимаются.
					</p>
				</div>
			</aside>
		</main>
	);
};

export default WarrantyPage;
