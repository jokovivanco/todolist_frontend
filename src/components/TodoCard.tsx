import { Pageable, TodoType } from '@/types';
import LetterImage from './LetterImage';
import { toHumanDate } from '@/lib/utils';
import TaskCompleted from './TaskCompleted';
import { Clock } from 'lucide-react';
import TodoMenu from './TodoMenu';
import { Link } from 'react-router-dom';

interface TodoCardProps {
  todo: TodoType;
  setTodoData: React.Dispatch<React.SetStateAction<Pageable>>;
}

const TodoCard = ({ todo, setTodoData }: TodoCardProps) => {
  return (
    <div className="flex items-center gap-2 p-4 rounded-md bg-white">
      <div className="self-start">
        <LetterImage words={todo.title} />
      </div>
      <div className="flex-1 self-start">
        <Link to={`/todos/${todo.id}`} state={{ todo }}>
          <p className="font-semibold text-lg text-balance break-all line-clamp-1">
            {todo.title}
          </p>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Clock size={18} className="text-muted" />
          <p className="text-muted text-sm">{toHumanDate(todo.created_at)}</p>
          <TaskCompleted tasks={todo.tasks} />
        </div>
      </div>
      <div>
        <TodoMenu todo={todo} setTodoData={setTodoData} />
      </div>
    </div>
  );
};
export default TodoCard;
