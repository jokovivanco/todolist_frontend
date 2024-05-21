import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Paging } from '@/types';
import { useSearchParams } from 'react-router-dom';

interface TodoPaginationProps {
  paging: Paging;
}

const TodoPagination = ({ paging }: TodoPaginationProps) => {
  const currentPage = paging.current_page;
  const totalPage = paging.total_page;

  const [, setSearchParams] = useSearchParams();

  const handleNavigation = (direction: string) => {
    const page = direction === 'prev' ? currentPage - 1 : currentPage + 1;

    setSearchParams({ page: page.toString() });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:bg-primary/90 hover:text-white"
            disabled={currentPage === 1}
            onClick={() => handleNavigation('prev')}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive
            className="hover:text-primary hover:bg-transparent"
          >
            {paging.current_page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="hover:bg-primary/90 hover:text-white"
            disabled={currentPage >= totalPage}
            onClick={() => handleNavigation('next')}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TodoPagination;
