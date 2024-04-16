import React, { useEffect, useState } from 'react'
import Tasks from './Tasks'

function Home() {

    const inititalArray = localStorage.getItem('tasks') ?
        JSON.parse(localStorage.getItem('tasks')) : [];
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTask] = useState(inititalArray);

    const submitHandler = (e) => {
        e.preventDefault();

        setTask([...tasks, {
            title, description
        }]);
        setTitle('');
        setDescription('');
    };

    useEffect(() => {
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }, [tasks]);

    const deleteTask = (index) => {
        const filtered = tasks.filter((val, i) => {
            return i !== index;
        })

        setTask(filtered);
    };

    return (

        <div className='container' onSubmit={submitHandler}>
            <h3>Lets write down the daily goals</h3>
            <form>
                <input type='text'
                    placeholder='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </input>
                <textarea
                    placeholder='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                </textarea>
                <button type='submit'>Add</button>
            </form>


            {tasks.map((item, index) => (
                <Tasks key={index} title={item.title} description={item.description} deleteTask={deleteTask} index={index} />
            ))}

        </div >
    )
}

export default Home
