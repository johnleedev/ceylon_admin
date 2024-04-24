import './Boxs.scss'

interface InputBoxProps {
  width: number;
  value: any;
  func: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox : React.FC<InputBoxProps> = ({width, value, func }) => (
  <input 
    className="input" type="text" 
    style={{width:`${width}px`}} value={value}
    onChange={func}
  />
)