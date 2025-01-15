interface TextBoxProps {
  text: string;
  text2?: string;
  width : string;
  height? : number;
  fontSize?: number;
}

export const TextBox : React.FC<TextBoxProps> = ({text, text2, width, height, fontSize}) => (
  <div className="text"
     style={{width:`${width}`, height: `${height}px` ?? '50px', textAlign:'center'}}>
    {
      text2 ? 
      <div>
        <p  style={{fontSize: fontSize ? `${fontSize}px` : '14px', color:'#1e99d6', marginBottom:'3px'}}>{text}</p>
        <p style={{fontSize: fontSize ? `${fontSize}px` : '14px'}}>{text2}</p>
      </div>
      :
      <p style={{fontSize: fontSize ? `${fontSize}px` : '14px'}}>{text}</p>
    }
    
  </div>
)
