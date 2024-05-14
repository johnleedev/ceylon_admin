import './Boxs.scss'

interface DropDownBoxProps {
  widthmain? : string;
  height? : string;
  selectedValue:any, 
  options: { value: string; label: string; }[];
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

 
export const DropdownBox: React.FC<DropDownBoxProps> = ({ widthmain, height, selectedValue, handleChange, options }) => {

  return (
    <div style={{width:widthmain, height: height}}>
      <select 
        value={selectedValue} 
        onChange={handleChange}
        className="dropdownBox"
      >
        {options.map((option:any, index:any) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};