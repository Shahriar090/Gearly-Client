import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const Language = () => {
  const [language, setLanguage] = useState<string>("");

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    console.log("Selected language:", value);
    console.log(language);
  };

  return (
    <div>
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[150px] data-[placeholder]:text-[var(--color-text)] text-sm font-medium">
          <SelectValue className="" placeholder="🌐 Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Language;
