import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormTextProps {
  name: "firstName" | "lastName" | "email" | "phone" | "message"; // Povolené názvy polí
  label: string;
  form: any;
}

const FormText: React.FC<FormTextProps> = ({ name, label, form }) => {
  return (
    <FormField
      control={form.control}
      name={name} // Správný název pole
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
