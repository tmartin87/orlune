import { useTasks } from "./useTasks";
import { CreateTaskForm } from "./CreateTaskForm";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { UpdateTaskForm } from "./UpdateTaskForm";

type SectionTasksProps = {
  sectionId: string;
};

export function SectionTasks({ sectionId }: SectionTasksProps) {
  const {
    data: tasks,
    isPending,
    isError,
  } = useTasks(sectionId);

  if (isPending) {
    return <p>Loading tasks...</p>;
  }

  if (isError) {
    return <p>Failed to load tasks.</p>;
  }

 return (
  <section>
    <CreateTaskForm sectionId={sectionId} />

    {tasks.length === 0 ? (
      <p>No tasks yet.</p>
    ) : (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>

            {task.description && <p>{task.description}</p>}

            <UpdateTaskForm
              taskId={task.id}
              sectionId={sectionId}
              currentTitle={task.title}
              currentDescription={task.description}
            />

            <DeleteTaskButton
              taskId={task.id}
              sectionId={sectionId}
            />
          </li>
        ))}
      </ul>
    )}
  </section>
)};