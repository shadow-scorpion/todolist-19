import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"
import List from "@mui/material/List"
import { TaskItem } from "./TaskItem/TaskItem"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton.tsx"
import { DomainTodolist } from "@/features/todolists/lib/types/types.ts"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data, isLoading } = useGetTasksQuery(id)

  // useEffect(() => {
  //   if(queryErr) {
  //     if('status' in queryErr) {
  //       const errMsg = 'error' in queryErr ? queryErr.error : JSON.stringify(queryErr)
  //       dispatch(setAppErrorAC({error: errMsg}))
  //     }
  //   }
  // }, [queryErr])

  if(isLoading) {
        return <TasksSkeleton/>
    }

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }
  // dispatch(setAppErrorAC({error: (error as any).data.message}))
  //



  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}</List>
      )}
    </>
  )
}
