interface TextBoxProps {
  text: string;
  text2?: string;
  width : number;
  height? : number
}

export const TextBox : React.FC<TextBoxProps> = ({text, text2, width, height }) => (
  <div className="text" style={{width:`${width}px`, height: `${height}px` ?? '50px'}}>
    {
      text2 ? 
      <div>
        <p  style={{color:'#1e99d6', marginBottom:'3px'}}>{text}</p>
        <p>{text2}</p>
      </div>
      :
      <p>{text}</p>
    }
    
  </div>
)
