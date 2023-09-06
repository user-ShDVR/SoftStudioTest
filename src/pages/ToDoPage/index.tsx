import { FC } from 'react';
import cls from './ToDoPage.module.scss'
import TodoList from '../../components/Todo';

interface ToDoPageProps {
}

export const ToDoPage: FC<ToDoPageProps> = () => {
    return (
        <div className={cls.ToDoPage}>
            <TodoList />
        </div>
    )
}