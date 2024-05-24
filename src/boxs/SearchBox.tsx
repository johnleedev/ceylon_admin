import { DropDownLandCompany, DropDownSearchSelect, DropDownTourLocation, DropDowncharger } from "../screens/DefaultData"
import { DateBoxNum } from "./DateBoxNum"
import { DropdownBox } from "./DropdownBox"
import './SearchBox.scss'

interface TextBoxProps {
  
}

export const SearchBox : React.FC<TextBoxProps> = ({}) => (

  <div className="searchbox">
    <div className="cover">
      <div className="title">
        <h3>기간</h3>
      </div>
      <div className="content">
        <DropdownBox
            widthmain='100px'
            height='35px'
            selectedValue={''}
            options={DropDownSearchSelect}
            handleChange={(e)=>{''}}
          />
        <div className="btn-row">
          {
            ["오늘", "어제", "3일", "7일", "1개월", "3개월", "6개월"]
            .map((item:any, index:any)=>{
              return (
                <div className='btnbox' key={index}>
                  <p>{item}</p>
                </div>
              )
            })
          }
        </div>
        <DateBoxNum width='150px' subWidth='130px' right={15} setSelectDate={''} date={''} marginLeft={1}/>
        <p>~</p>
        <DateBoxNum width='150px' subWidth='130px' right={15} setSelectDate={''} date={''} marginLeft={1}/>
      </div>
    </div>
    <div className="cover">
      <div className="title">
        <h3>검색어</h3>
      </div>
      <div className="content">
        <div className='selectCover'>
          <DropdownBox
            widthmain='100px'
            height='35px'
            selectedValue={''}
            options={DropDownTourLocation}
            handleChange={(e)=>{}}
          />
          <DropdownBox
            widthmain='100px'
            height='35px'
            selectedValue={''}
            options={DropDownLandCompany}
            handleChange={(e)=>{}}
          />
          <DropdownBox
            widthmain='100px'
            height='35px'
            selectedValue={''}
            options={DropDowncharger}
            handleChange={(e)=>{}}
          />
        </div>
        <input className="inputdefault" type="text" style={{width:'30%', textAlign:'left'}} 
          value={''} onChange={(e)=>{''}}/>
      </div>
    </div>
    <div className="buttonbox">
      <div className="buttons">
        <div className="btn searching">
          <p>검색</p>
        </div>
        <div className="btn reset">
          <p>초기화</p>
        </div>
      </div>
    </div>
  </div>
)
