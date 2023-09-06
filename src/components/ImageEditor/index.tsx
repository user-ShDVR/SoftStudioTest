import React, { useState, useRef } from 'react';
import { Button, Modal, Slider } from 'antd';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import cls from './ImageEditor.module.scss'

const ImageEditor: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState<number>(1.2);


  const editorRef = useRef<AvatarEditor>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedImage = acceptedFiles[0];
      if (selectedImage.type.startsWith('image/')) {
        setPreviewImage(URL.createObjectURL(selectedImage));
        setVisible(true);
      } else {
        console.error('Неверный тип файла. Ожидалось изображение.');
      }
    }
  };

  const handleSaveImage = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const editedImage = new File([blob], 'edited-image.png', { type: 'image/png' });

          const downloadURL = URL.createObjectURL(editedImage);

          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = downloadURL;
          a.download = 'edited-image.png';

          document.body.appendChild(a);
          a.click();

          URL.revokeObjectURL(downloadURL);
          document.body.removeChild(a);
        }
      }, 'image/png');
      
      setVisible(false);
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  return (
    <div>
      <h1>Редактор изображений</h1>
      <Dropzone onDrop={onDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className={cls.dropzoneStyle}>
              <input {...getInputProps()} />
              <p>Перетащите изображение сюда или кликните, чтобы загрузить.</p>
            </div>
          </section>
        )}
      </Dropzone>
      {previewImage && (
        <>
          <Modal
            title="Кадрирование изображения"
            open={visible}
            onOk={handleSaveImage}
            onCancel={handleCloseModal}
            footer={[
              <Button key="submit" type="primary" onClick={handleSaveImage}>
                Сохранить изображение
              </Button>,
            ]}
          >
            <AvatarEditor
              ref={editorRef}
              image={previewImage}
              width={400}
              height={400}
              border={10}
              color={[255, 255, 255, 0.6]}
              scale={scale}
            />
            <Slider value={scale} step={0.05} min={1} max={3} onChange={(value)=> setScale(value)} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default ImageEditor;
