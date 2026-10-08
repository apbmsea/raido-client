import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import MessageIcon from '@shared/icons/Message';
import { Button } from '@shared/ui/Button';
import { EmptyState } from '@shared/ui/EmptyState';
import { LoadMore } from '@shared/ui/LoadMore';
import { Loader } from '@shared/ui/Loader';
import { actions } from '../model/questionSlice';
import { QuestionCard } from './QuestionCard';
import './QuestionsList.scss';

const INITIAL_COUNT = 3;
const SHOW_MORE_STEP = 5;

export const QuestionsList = ({ productId }: { productId: number }) => {
	const dispatch = useAppDispatch();
	const { questions, isLoading, paging } = useAppSelector(
		state => state.question
	);
	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

	if (isLoading && questions.length === 0) return <Loader />;

	if (questions.length === 0) {
		return (
			<EmptyState
				icon={<MessageIcon size={40} />}
				title='Вопросов о товаре пока нет'
				description='Спросите о товаре — мы ответим в ближайшее время.'
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
			{questions.length > visibleCount ? (
				<Button
					size='s'
					variant='outline'
					onClick={() => setVisibleCount(count => count + SHOW_MORE_STEP)}
				>
					Показать ещё
				</Button>
			) : (
				// Всё загруженное уже раскрыто — дальше список дочитывается с сервера
				<LoadMore
					paging={paging}
					onLoadMore={() => {
						setVisibleCount(Infinity);
						dispatch(actions.getQuestionMoreRequest({ productId }));
					}}
				/>
			)}
		</div>
	);
};
