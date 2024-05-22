interface TitleBoxProps {
  text: string;
  fontSize? : number;
  width : string;
  height? : number
}

export const TitleBox : React.FC<TitleBoxProps> = ({text, fontSize, width, height }) => (
  <div className="title" style={{width:`${width}`, height: `${height}px` ?? '50px'}}>
    <h3 style={{fontSize : fontSize ?? '16px' }}>{text}</h3>
  </div>
)
