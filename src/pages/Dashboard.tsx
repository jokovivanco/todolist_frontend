import SearchTodo from '@/components/SearchTodo';
import TodoCard from '@/components/TodoCard';
import TodoPagination from '@/components/TodoPagination';
import CreateTodoForm from '@/forms/CreateTodoForm';
import useAuthAxios from '@/hooks/useAuthAxios';
import { Pageable, TodoQueriesType } from '@/types';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Dashboard = () => {
  const [todoData, setTodoData] = useState<Pageable>({} as Pageable);
  const authAxios = useAuthAxios();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryTitle = searchParams.get('title');
  const queryPage = searchParams.get('page');
  const querySize = searchParams.get('size');

  const queries: TodoQueriesType = {} as TodoQueriesType;

  if (queryTitle) {
    queries.title = queryTitle;
  }

  if (queryPage) {
    queries.page = queryPage;
  }

  if (querySize) {
    queries.size = querySize;
  }

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await authAxios('/api/todos', {
          method: 'GET',
          params: queries,
        });

        setTodoData(response.data);
      } catch (error) {
        console.log(error);

        navigate('/login');
      }
    };

    getTodos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authAxios, navigate, searchParams]);

  return (
    <div className="space-y-4 py-4 container">
      <SearchTodo />
      <CreateTodoForm setTodoData={setTodoData} />
      {todoData?.data?.length > 0 ? (
        todoData.data.map((todo) => (
          <TodoCard todo={todo} setTodoData={setTodoData} key={todo.id} />
        ))
      ) : (
        <p>No results... </p>
      )}
      {todoData?.paging && <TodoPagination paging={todoData.paging} />}
    </div>
  );
};
export default Dashboard;
