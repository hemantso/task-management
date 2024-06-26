import { useEffect, useState } from 'react';
import { Task } from '../interfaces';
import { useAppSelector } from '../store/hooks';

const useSearchQuery = (searchQuery: string) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const [matchedTasks, setMatchedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const searchLower = searchQuery.toLowerCase();
    const searchByStatus =
      searchLower === "done" ? true : searchLower === "in progress" ? false : null;

    const filteredTasks = tasks.filter((task: Task) => {
      return (
        task.title.toLowerCase().includes(searchLower) ||
        (searchByStatus !== null && task.status === searchByStatus)
      );
    });

    if (searchQuery.trim().length) {
      setMatchedTasks(filteredTasks);
    } else {
      setMatchedTasks([]);
    }
  }, [searchQuery, tasks]);

  return matchedTasks;
};

export default useSearchQuery;
