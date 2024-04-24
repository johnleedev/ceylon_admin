interface TextDoubleBoxProps {
  text: string;
  width : number;
  height? : number
}

export const TextDoubleBox : React.FC<TextDoubleBoxProps> = ({text, width, height }) => (
  <div className="text" style={{width:`${width}px`, height: `${height}px` ?? '50px'}}>
    <p>{text}</p>
  </div>
)
