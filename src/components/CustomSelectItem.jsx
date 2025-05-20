import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const CustomSelectItem = ({ values, setValues, name, crew, label }) => {
  return (
    <div key={name}>
      <Label className="py-4">{label}</Label>
      <Select
        onValueChange={(value) => {
          if (name === "ac") {
            const selected = crew.find((item) => item.aircraft === value);

            setValues({ ...values, [name]: selected });
          } else if (name === "operator") {
            const selected = crew.find((item) => item._id === value);
            setValues({ ...values, [name]: selected });
          } else {
            setValues({ ...values, [name]: value });
          }
        }}
        value={
          name === "ac"
            ? values[name]?.registration
            : name === "operator"
            ? values[name]?._id
            : values[name]
        }
      >
        <SelectTrigger className="min-w-40">
          <SelectValue placeholder={"Select " + name} className="min-w-16" />
        </SelectTrigger>
        <SelectContent>
          {crew?.map((item) => {
            const value =
              name === "ac"
                ? item.aircraft
                : name === "operator"
                ? item._id
                : item.fullname;

            const label = name === "ac" ? item.aircraft : item.fullname;

            return (
              <SelectItem key={item._id} value={value}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
