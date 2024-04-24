interface RadioBoxProps {
  text: string;
  func: (event: React.SyntheticEvent<any> | undefined) => void;
  width?: number,
  selectedValue: string
}

export const RadioBox : React.FC<RadioBoxProps> = ({text, func, width, selectedValue }) => (
  <div style={{width:`${width}px`, display:'flex', alignItems:'center'}}>
    <input
      style={{width:'15px'}}
      type="radio"
      id={text}
      className="input"
      value={text}
      checked={selectedValue === text}
      onChange={func}
    />
    <label htmlFor={text}>{text}</label>
  </div>
)
