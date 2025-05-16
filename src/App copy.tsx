// localforage をインポート
import localforage from 'localforage';

// React から useState フックをインポート
import { useState , useEffect } from 'react';

import { isTodos } from "./lib/isTodos";


export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text) return;

      // 新しい Todo を作成
    // 型注釈を付けてオブジェクトの型を限定
    const newTodo: Todo = {
      value: text,  // text ステートの値を value プロパティへ
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    /**
     * 更新前の todos ステートを元に
     * newTodo を加えた新しい配列でステートを更新
     **/
    setTodos((todos) => [newTodo, ...todos]);
    setText('');  // フォームへの入力をクリアする
    };

    const handoleTodo = <K extends keyof Todo, V extends Todo[K]>(
      id: number,
      key: K,
      value: V
    ) =>{
      setTodos((todos) => {
        const newTodos = todos.map((todo) => {
          if (todo.id === id){
            return{...todo, [key]: value};
          }else {
            return todo;
          }
        });
        return newTodos;
      });
    };

    const handleFilter = (filter: Filter) => {
      setFilter(filter);
    };
    

    const filteredTodos = todos.filter((todo) => {
      switch (filter){
        case 'all':
          return !todo.removed;
        case 'checked':
          return todo.checked && !todo.removed;
        case 'unchecked':
          return !todo.checked && !todo.removed;
        case 'removed':
          return todo.removed;
        default:
          return todo;
      }
    });

    const handleEmpty = () => {
      setTodos((todos) => todos.filter((todo) => !todo.removed));
    };

    useEffect(() => {
      localforage
      .getItem("todo-20200101")
      .then((values) => isTodos(values) && setTodos(values));
    }, []);

    useEffect(() => {
      localforage.setItem("todo-20200101", todos);
    }, [todos]);


    return (
      <div>
        <select defaultValue="all"
        onChange={(e) => handleFilter(e.target.value as Filter)}
        >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === 'removed' ? (
      <button
        onClick={handleEmpty}
        disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
      </button>
       ) : (
        filter !== 'checked' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
          type="text"
          value={text}
          disabled={filter === 'checked' || filter === 'removed'}
          onChange={(e) => handleChange(e)}
          />
          <input
          type="submit"
          value="追加"
          disabled={filter === 'checked' || filter === 'removed'}
          onSubmit={handleSubmit}
          />
        </form>
        )
       )}
        <ul>
      {filteredTodos.map((todo) => {
      return (
        <li key={todo.id}>
          <input
            type="checkbox"
            disabled={todo.removed}
            checked={todo.checked}
            onChange={() => handoleTodo(todo.id, 'checked', !todo.checked)}
          />
          <input
            type="text"
            disabled={todo.checked || todo.removed}
            value={todo.value}
            onChange={(e) => handoleTodo(todo.id, 'value', e.target.value)}
          />
          <button onClick={() => handoleTodo(todo.id, 'removed', !todo.removed)}>
          {todo.removed ? '復元' : '削除'}</button>
        </li>
      );
    })}
  </ul>
      </div>
    );
  };