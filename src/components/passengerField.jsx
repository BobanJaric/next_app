import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CreateTurApi from "@/utils/CreateTurApi";




export const renderPassengerFields = (i, values, handlePaxOnChange, api, error) => {

  const pax = values.pax[i];

  return (
    <div key={i} className={`grid grid-cols-1 ${api.turkey ? 'md:grid-cols-7' : 'md:grid-cols-6'}  gap-4 p-4 border rounded-xl shadow-sm  mb-4`}>
      <Input
        placeholder="First and Last Name"
        className="w-full"
        value={pax?.name}
        onChange={(e) => handlePaxOnChange(i, "name", e.target.value)}
      />

      <Input
        placeholder="Date of Birth"
        className="w-full"
        value={pax?.dob}
        onChange={(e) => handlePaxOnChange(i, "dob", e.target.value.replace(/,/g, "."))}
      />


      <div>
        <Input
          placeholder="Nationality"
          className="w-full"
          value={pax?.nationality}
          onChange={(e) => {

            handlePaxOnChange(i, "nationality", e.target.value);
          }}
        />
        {error && <><p className="text-red-500 text-sm mt-1">{error}</p></>}
      </div>

      <Input
        placeholder="Passport Number"
        className="w-full"
        value={pax?.passport}
        onChange={(e) => handlePaxOnChange(i, "passport", e.target.value)}
      />

      <Input
        placeholder="Passport Expiry"
        className="w-full"
        value={pax?.doe}
        onChange={(e) => handlePaxOnChange(i, "doe", e.target.value.replace(/,/g, "."))}
      />

      <Select
        value={pax?.gender}
        onValueChange={(value) => handlePaxOnChange(i, "gender", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="M">Male</SelectItem>
          <SelectItem value="F">Female</SelectItem>
        </SelectContent>
      </Select>

      {api.turkey && <div className="w-full">
        <CreateTurApi val={pax} />
      </div>}
    </div>
  );
};
