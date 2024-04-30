interface TextBoxProps {
  text: string;
  text2?: string;
  width : number;
  height? : number;
  fontSize?: number;
}

export const TextBox : React.FC<TextBoxProps> = ({text, text2, width, height, fontSize}) => (
  <div className="text"
     style={{width:`${width}px`, height: `${height}px` ?? '50px'}}>
    {
      text2 ? 
      <div>
        <p  style={{fontSize: `${fontSize}px` ?? '16px', color:'#1e99d6', marginBottom:'3px'}}>{text}</p>
        <p style={{fontSize: `${fontSize}px` ?? '16px'}}>{text2}</p>
      </div>
      :
      <p style={{fontSize: `${fontSize}px` ?? '16px'}}>{text}</p>
    }
    
  </div>
)
