import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Layers } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { groupOptions } from "@/constant/global";

const FilterBar = () => {
  const form = useForm({
    defaultValues: {
      group: groupOptions[2].value,
    },
  });
  return (
    <div>
      <Form {...form}>
        <form>
          <Select
            name='group'
            options={groupOptions}
            formControl={form.control}
            icon={<Layers />}
            label='Group'
            labelPosition='center'
            className='rounded-full'
          />
        </form>
      </Form>
    </div>
  );
};

export default FilterBar;
