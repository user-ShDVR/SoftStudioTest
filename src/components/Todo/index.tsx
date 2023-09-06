import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Button, Modal, Input } from 'antd';
import { RootState } from '../../redux/store';
import { Todo, addTodo, deleteTodo, editTodo } from '../../redux/features/todoSlice';
import cls from './TodoList.module.scss'


const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [addName, setAddName] = useState('');
    const [addText, setAddText] = useState('');

    const showModal = (todo?: Todo) => {
        setEditingTodo(todo || null);
        if (todo) {
            setName(todo.name);
            setText(todo.text);
        } else {
            setName('');
            setText('');
        }
        setVisible(true);
    };

    const addOnClick = () => {

        dispatch(addTodo({
            id: Date.now(),
            name: addName,
            text: addText,
        }));

        setVisible(false);
        setAddName('');
        setAddText('');
    };

    const handleUpdate = () => {
        if (editingTodo) {
            dispatch(editTodo({ ...editingTodo, name, text }));
        }
        setVisible(false);
        setName('');
        setText('');
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <h1 className={cls.Todo__header}>To-Do List</h1>
            <div className={cls.Todo__addCard}>
            <Input placeholder="Название" value={addName} maxLength={30} onChange={(e) => setAddName(e.target.value)} />
            <Input placeholder="Описание" value={addText} maxLength={30} onChange={(e) => setAddText(e.target.value)} />
            <Button type="primary" onClick={addOnClick}>Добавить задачу</Button>
            </div>
            <List
                locale={{emptyText:"Задач нет 😕"}}
                dataSource={todos}
                renderItem={(todo) => (
                    <List.Item
                        actions={[
                            <Button onClick={() => showModal(todo)}>Редактировать</Button>,
                            <Button onClick={() => dispatch(deleteTodo(todo.id))} danger>Удалить</Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={todo.name}
                            description={todo.text}
                        />
                    </List.Item>
                )}
            />
            <Modal
                title={"Редактировать задачу"}
                open={visible}
                onOk={handleUpdate}
                onCancel={handleCancel}
            >
                <div className={cls.Todo__editCardModal}>
                    <Input placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Описание" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
            </Modal>
        </div>
    );
};

export default TodoList;
