import Select from 'react-select';

interface SelectBoxProps {
  widthmain : number;
  notice : { value: string, label: string };
  data : { value: string; label: string; }[];
  selectWidth: number;
  selectTextWidth: number;
}

export const SelectBox : React.FC<SelectBoxProps> = ({widthmain, notice, data, selectWidth, selectTextWidth }) => (
  <div className='selectbox' style={{width: `${widthmain}px`}}>
    <Select
      value={notice}
      onChange={(e)=>{}}
      options={data}
      blurInputOnSelect
      styles={{ control: (baseStyles, state) => ({...baseStyles, width: `${selectWidth}px`, height:'30px',}),
        singleValue: (styles, { data }) => ({ ...styles, width: `${selectTextWidth}px`, fontSize:'15px' })}}
    />
  </div>
)