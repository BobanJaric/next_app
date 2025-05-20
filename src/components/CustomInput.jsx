import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CustomInput = ({ name, handleOnChange, type, label }) => {
  return (
    <div>
      <Label className="py-4">{label}</Label>
      <Input
        placeholder={name}
        name={name}
        onChange={handleOnChange}
        type={type}
        className={"uppercase placeholder:capitalize max-w-40"}
      />
    </div>
  );
};
