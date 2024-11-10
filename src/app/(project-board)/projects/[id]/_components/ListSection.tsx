"use client";
import React, { useState } from "react";

import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

export default function ListSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [invoices, setInvoices] = useState([
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = invoices.findIndex((item) => item.invoice === active.id);
      const newIndex = invoices.findIndex((item) => item.invoice === over.id);
      setInvoices(arrayMove(invoices, oldIndex, newIndex));
    }

    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <div>
      <div className=''>
        <div className='grid grid-cols-4 place-items-center'>
          <div>Invoice</div>
          <div>Status</div>
          <div>Method</div>
          <div className='text-right'>Amount</div>
        </div>
      </div>
      <div className='mt-4 grid gap-2 overflow-hidden'>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <SortableContext items={invoices.map((invoice) => invoice.invoice)}>
            {invoices.map((invoice) => (
              <SortbaleList
                key={invoice.invoice}
                data={invoice}
                isDragging={isDragging}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function SortbaleList({
  data,
  isDragging,
}: {
  data: any;
  isDragging: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.invoice });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      key={data?.invoice}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "grid grid-cols-4 place-items-center border rounded-md p-2",
        isDragging ? "cursor-grabbing" : ""
      )}
    >
      <div className='font-medium'>{data?.invoice}</div>
      <div className=''>{data?.paymentStatus}</div>
      <div>{data?.paymentMethod}</div>
      <div className='text-right'>{data?.totalAmount}</div>
    </div>
  );
}
