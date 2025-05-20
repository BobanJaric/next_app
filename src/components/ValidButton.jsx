import { Button } from "./ui/button";

export const ValidButton = ({ isLoading, createXml, data, values, name,api }) => {
  return (
    <div className="mt-6 bg-[#1f883d]">
      {api[name] && (
        <Button
          className="w-full "
          disabled={isLoading}
          onClick={() => createXml(data, values)}
          variant="secondary"
        >
          {isLoading ? "Loading..." : name + " API"}
        </Button>
      )}
    </div>
  );
};
