import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormTextProps {
  name: "firstName" | "lastName" | "email" | "phone" | "message";
  label: string;
  form: UseFormReturn<
    {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      practiceArea:
        | "corporate"
        | "litigation"
        | "family"
        | "ip"
        | "real-estate"
        | "estate-planning";
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}

const FormText: React.FC<FormTextProps> = ({ name, label, form }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={label} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormText;
