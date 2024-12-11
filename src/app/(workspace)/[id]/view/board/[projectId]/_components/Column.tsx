import React from "react";
import Card from "./Card";

const Column = ({
  id,
  title,
  tasks,
}: {
  id: string;
  title: string;
  tasks: any[];
}) => {
  return (
    <div className='border-2 border-muted-foreground min-h-96 min-w-96 py-3 px-4 rounded'>
      <h1 className='text-lg'>{title}</h1>
      <div className='space-y-4 mt-3'>
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
