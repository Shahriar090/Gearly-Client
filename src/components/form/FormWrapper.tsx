import React from "react";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";

type TFormWrapperProps<T extends ZodSchema> = {
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: (values: z.infer<T>) => void;
  children: (form: ReturnType<typeof useForm<z.infer<T>>>) => React.ReactNode;
  submitButtonLabel?: string;
};

const FormWrapper = <T extends ZodSchema>({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitButtonLabel = "Submit",
}: TFormWrapperProps<T>) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* render prop pattern */}
        {children(form)}
        <div className="pt-4">
          <Button className="w-full" type="submit" variant="default">
            {submitButtonLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormWrapper;
