interface TitleBoxProps {
  text: string;
  width : number;
  height? : number
}

export const TitleBox : React.FC<TitleBoxProps> = ({text, width, height }) => (
  <div className="title" style={{width:`${width}px`, height: `${height}px` ?? '50px'}}>
    <h3>{text}</h3>
  </div>
)
