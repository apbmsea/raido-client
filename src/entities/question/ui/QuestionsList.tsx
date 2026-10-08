import { useState } from 'react';
import { useAppSelector } from '@shared/hooks/store.hooks';
import MessageIcon from '@shared/icons/Message';
import { Button } from '@shared/ui/Button';
import { EmptyState } from '@shared/ui/EmptyState';
import { Loader } from '@shared/ui/Loader';
import { QuestionCard } from './QuestionCard';
import './QuestionsList.scss';

const INITIAL_COUNT = 3;
const SHOW_MORE_STEP = 5;

export const QuestionsList = () => {
	const { questions, isLoading } = useAppSelector(state => state.question);
	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

	if (isLoading && questions.length === 0) return <Loader />;

	if (questions.length === 0) {
		return (
			<EmptyState
				variant='compact'
				icon={<MessageIcon size={40} />}
				title='Вопросов о товаре пока нет'
			/>
		);
	}

	return (
		<div className='questions-list'>
			<div className='questions-list__items'>
				{questions.slice(0, visibleCount).map(question => (
					<QuestionCard question={question} key={question.id} />
				))}
			</div>
			{questions.length > visibleCount && (
				<Button
					size='s'
					variant='outline'
					onClick={() => setVisibleCount(count => count + SHOW_MORE_STEP)}
				>
					Показать ещё
				</Button>
			)}
		</div>
	);
};
