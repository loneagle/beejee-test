import React, { useState } from 'react';

const Row = (props) => {
  const { task, authTokens, editTask } = props;
  const [checked, setChecked] = useState(task.status === 10);
  const [text, setText] = useState(task.text);

  return (
    <tr>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!authTokens}
        />
      </td>
      <td>
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
          disabled={!authTokens}
        />
      </td>
      {(authTokens && authTokens.length) ? (
        <td
          onClick={() => editTask({
            id: task.id,
            token: authTokens.replace(/^"(.*)"$/, '$1'),
            text: text,
            status: checked ? 10 : 0})
          }>
          Change
        </td>
      ) : null}
    </tr>
  );
};

export default Row;

