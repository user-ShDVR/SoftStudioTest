import { FC } from 'react';
import cls from './ImageCutPage.module.scss'
import ImageEditorScreen from '../../components/ImageEditor';

interface ImageCutPageProps {
}

export const ImageCutPage: FC<ImageCutPageProps> = () => {
    return (
        <div className={cls.ImageCutPage}>
            <ImageEditorScreen />
        </div>
    )
}