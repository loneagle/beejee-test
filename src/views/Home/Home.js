import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { loadTasks, addNewTask, editTask } from '../../modules/actions/userActions';
import { useAuth } from '../../utils/context';
import AddTaskForm from './addTaskForm';
import Sort from '../Sort';
import Pagination from '../Pagination';
import Row from './Row';

const Home = (props) => {
    const { authTokens } = useAuth();

    const {
        loadTasks: loadTasksAct,
        addNewTask: addNewTaskAct,
        tasks = [],
        total_task_count,
        editTask: editTaskAct
    } = props;

    const [page, setPage] = useState(1);
    const [field, setField] = useState('username');
    const [direction, setDirection] = useState('desc');

    useEffect(() => {
        loadTasksAct(page, field, direction);
    }, [loadTasksAct]);


    const setPageOnHome = (page) => {
        loadTasksAct(page, field, direction);
        setPage(page);
    };

    const setSortField = (field) => {
        loadTasksAct(1, field, direction);
        setPage(1);
        setField(field);
    };

    const setSortDirection = (direction) => {
        loadTasksAct(1, field, direction);
        setPage(1);
        setDirection(direction);
    };

    return (
        <div className="home">
            <Sort
              field={field}
              direction={direction}
              setSortField={setSortField}
              setSortDirection={setSortDirection}
            />
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Text</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task =>
                        <Row
                          key={task.id}
                          task={task}
                          authTokens={authTokens}
                          editTask={editTaskAct}
                        />
                    )}
                </tbody>
            </table>
            <Pagination
              length={total_task_count}
              page={page}
              setPage={setPageOnHome}
            />
            <AddTaskForm
              addTask={addNewTaskAct}
              page={page}
              field={field}
              direction={direction}
              loadTasks={loadTasksAct}
            />
        </div>
    );
};

export default connect((state) => state.user, { loadTasks, addNewTask, editTask })(Home);