interface TitleBoxProps {
  text: string;
  fontSize? : number;
  width : string;
  height? : number;
  backgroundColor? : string;
}

export const TitleBox : React.FC<TitleBoxProps> = ({text, fontSize, width, height, backgroundColor }) => (
  <div className="title" 
    style={{width:`${width}`, height: `${height}px` ?? '40px', backgroundColor: backgroundColor}}
  >
    <h3 style={{fontSize : fontSize ?? '14px' }}>{text}</h3>
  </div>
)
