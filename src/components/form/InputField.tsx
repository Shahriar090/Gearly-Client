import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

type TOption = {
  label: string;
  value: string;
};

type TInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?:
    | "text"
    | "textarea"
    | "number"
    | "password"
    | "email"
    | "file"
    | "select"
    | "checkbox"
    | "radio";
  options?: TOption[]; // for select/dropdown
  isVisible?: boolean; // optional visibility flag for dynamic forms
  multipleFiles?: boolean; // support multiple file upload
};

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  options = [],
  isVisible = true,
  multipleFiles = false,
}: TInputFieldProps<T>) => {
  if (!isVisible) return null; // Hide if not visible

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderInput(field: any) {
    switch (type) {
      case "textarea":
        return <Textarea {...field} placeholder={placeholder} />;

      case "file":
        return (
          <Input
            type="file"
            multiple={multipleFiles}
            onChange={(e) =>
              field.onChange(
                multipleFiles ? e.target.files : e.target.files?.[0]
              )
            }
          />
        );

      case "select":
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <Checkbox
            checked={field.value ?? false}
            onCheckedChange={(checked) => field.onChange(checked)}
          />
        );

      case "radio":
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case "number":
        return (
          <Input
            type="number"
            {...field}
            placeholder={placeholder}
            value={field.value === undefined ? "" : field.value}
            onChange={(e) => {
              const newValue =
                e.target.value === "" ? "" : Number(e.target.value);

              field.onChange(newValue);
            }}
          />
        );

      default: // text, number, email, password
        return (
          <Input
            type={type}
            {...field}
            placeholder={placeholder}
            value={field.value ?? ""}
          />
        );
    }
  }
};

export default InputField;
