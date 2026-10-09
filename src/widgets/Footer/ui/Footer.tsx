import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '@shared/constants/navbar';
import { AppLink } from '@shared/ui/AppLink';
import './Footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer__container'>
				<Link className='footer__logo' to='/' aria-label='На главную'>
					<img
						src='/logo.png'
						alt='Райдо Сервис'
						width={169}
						height={50}
						loading='lazy'
						decoding='async'
					/>
				</Link>

				<div className='footer__links'>
					{NAV_ITEMS.map(item => (
						<div className='footer__block' key={item.id}>
							<h2 className='footer__block-title'>{item.title}</h2>
							<div className='footer__block-links'>
								{item.content.map(link => (
									<AppLink
										key={link.link}
										to={link.link}
										isExternal={link.isExternal}
										className='footer__link'
									>
										{link.title}
									</AppLink>
								))}
							</div>
						</div>
					))}
				</div>

				<p className='footer__copyright'>
					© {new Date().getFullYear()} Райдо Сервис
				</p>
			</div>
		</footer>
	);
};

export default Footer;
