import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";



  export const renderPassengerFields = (i, values, handlePaxOnChange) => {
    const pax = values.pax[i];
  
    return (
      <div key={i} className="grid md:grid-cols-6 gap-4">
        <div>
          <Input
            placeholder="First and Last Name"
            className="w-45 ml-1"
            value={pax?.name}
            onChange={(e) => handlePaxOnChange(i, "name", e.target.value)}
          />
        </div>
        <div>
          <Input
            value={pax?.dob}
            onChange={(e) => handlePaxOnChange(i, "dob", (e.target.value))}
          />
        </div>
        <div>
          <Input
            placeholder="e.g. Serbian"
            value={pax?.nationality}
            onChange={(e) => handlePaxOnChange(i, "nationality", e.target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="Passport Number"
            value={pax?.passport}
            onChange={(e) => handlePaxOnChange(i, "passport", e.target.value)}
          />
        </div>
        <div>
          <Input
            value={pax?.doe}
            onChange={(e) => handlePaxOnChange(i, "doe", (e.target.value))}
          />
        </div>
        <div>
          <Select
            value={pax?.gender}
            onValueChange={(value) => handlePaxOnChange(i, "gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Male</SelectItem>
              <SelectItem value="F">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };