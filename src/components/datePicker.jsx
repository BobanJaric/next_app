import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export const DatePicker = ({ values, setValues }) => {
  return (
    <div>
      <Label className="py-4">Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full text-left font-normal">
            {values.date ? (
              format(values.date, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            initialFocus
            onSelect={(value) => setValues({ ...values, date: value })}
            selected={values.date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
