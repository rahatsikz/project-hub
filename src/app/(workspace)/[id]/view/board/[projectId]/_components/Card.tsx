import React from "react";

const Card = ({ task }: { task: any }) => {
  return (
    <div className='bg-muted min-h-16 flex items-center pl-4 rounded'>
      <p className='text-sm'>{task.name}</p>
    </div>
  );
};

export default Card;
