import { FC } from 'react';
import cls from './MainPage.module.scss'
import { MainForm } from '../../components/Form';

interface MainPageProps {
}

export const MainPage: FC<MainPageProps> = () => {
    return (
        <div className={cls.MainPage}>
            <MainForm />
        </div>
    )
}