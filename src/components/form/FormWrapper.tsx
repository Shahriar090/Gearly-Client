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
  submitButtonIsDisabled?: boolean;
};

const FormWrapper = <T extends ZodSchema>({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitButtonLabel = "Submit",
  submitButtonIsDisabled,
}: TFormWrapperProps<T>) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // tracking form submission status
  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* render prop pattern */}
        {children(form)}
        <div className="pt-4  flex justify-center md:justify-end">
          <Button
            className="w-full md:w-fit"
            type="submit"
            variant="default"
            disabled={submitButtonIsDisabled ?? isSubmitting}
          >
            {submitButtonLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormWrapper;
