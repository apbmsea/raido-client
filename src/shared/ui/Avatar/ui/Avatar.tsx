import clsx from 'clsx';
import ProfileIcon from '@shared/icons/Profile';
import './Avatar.scss';

interface AvatarProps {
	/** Имя, из которого берутся инициалы. Без имени показывается иконка */
	name?: string;
	className?: string;
}

const Avatar = ({ name, className }: AvatarProps) => {
	const initials = (name ?? '')
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map(word => word[0].toUpperCase())
		.join('');

	return (
		<span className={clsx('avatar', className)} aria-hidden='true'>
			{initials || <ProfileIcon size={20} />}
		</span>
	);
};

export default Avatar;
