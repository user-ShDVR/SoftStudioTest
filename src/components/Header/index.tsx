import { FC } from 'react'
import cls from './Header.module.scss'
import { Link } from 'react-router-dom';

interface HeaderProps {
    className?: string;
}

export const Header: FC<HeaderProps> = () => {
    return (
        <div className={cls.Header}>
            <Link to={'/'} >Форма</Link>
            <Link to={'/image'} >ImageCutter</Link>
            <Link to={'/todo'} >Todo</Link>
        </div>
    )
}