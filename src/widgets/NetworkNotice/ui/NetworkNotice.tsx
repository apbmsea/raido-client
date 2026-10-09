import { useEffect, useState, useSyncExternalStore } from 'react';
import {
	getIsNetworkSlow,
	reportPageLoad,
	subscribeToNetworkSpeed
} from '@shared/api/networkSpeed';
import CloseIcon from '@shared/icons/Close';
import { IconButton } from '@shared/ui/IconButton';
import './NetworkNotice.scss';

const DISMISS_KEY = 'vpn-notice-dismissed';

const readIsDismissed = () => {
	try {
		return sessionStorage.getItem(DISMISS_KEY) === '1';
	} catch {
		return false;
	}
};

const NetworkNotice = () => {
	const isSlow = useSyncExternalStore(
		subscribeToNetworkSpeed,
		getIsNetworkSlow
	);
	const [isDismissed, setIsDismissed] = useState(readIsDismissed);

	useEffect(() => {
		reportPageLoad();
	}, []);

	if (!isSlow || isDismissed) return null;

	const handleClose = () => {
		setIsDismissed(true);

		try {
			sessionStorage.setItem(DISMISS_KEY, '1');
		} catch {}
	};

	return (
		<div className='network-notice' role='status'>
			<div className='network-notice__container'>
				<p className='network-notice__text'>
					<strong>Сайт загружается медленнее обычного.</strong> Если у
					вас включён VPN, отключите его — с ним сайт может работать
					хуже.
				</p>
				<IconButton
					className='network-notice__close'
					variant='ghost'
					size='xs'
					icon={<CloseIcon size={16} />}
					onClick={handleClose}
					aria-label='Закрыть уведомление'
				/>
			</div>
		</div>
	);
};

export default NetworkNotice;
