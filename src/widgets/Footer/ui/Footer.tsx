import { NAV_ITEMS } from '@shared/constants/navbar';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer__container'>
				<div className='footer__logo'>
					<img src='./logo.png' alt='РАЙДО СЕРВИС' />
				</div>

				<div className='footer__links'>
					{NAV_ITEMS.map(item => (
						<div className='footer__block' key={item.id}>
							<h2 className='footer__block-title'>
								{item.title}
							</h2>
							<div className='footer__block-links'>
								{item.content?.map(link => (
									<Link
										key={link.link}
										to={link.link}
										className='footer__block-link'
									>
										{link.title}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
