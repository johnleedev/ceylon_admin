import React, { useEffect, useRef, useState } from 'react'
import './EstimateDetail.scss'
import { TitleBox } from '../../boxs/TitleBox';
import { DateBoxNum } from '../../boxs/DateBoxNum';
import { useNavigate, useLocation } from 'react-router-dom';
import { DropdownBox } from '../../boxs/DropdownBox';
import { DropDownNum, DropDownTourLocation, DropDownVisitPath } from '../DefaultData';


export default function EstimateDetail (props : any) {

  let navigate = useNavigate();
  

  // 오른쪽바 데이터 입력 ------------------------------------------------------------------------------------------------------
  const [test, setTest] = useState('');



  return (
    <div className='estimatedetail'>
      
      <div className='title-box'>
        <h1>견적서</h1>
      </div>

      <div className="estimatecover">

        
        {/* 왼쪽 데이터 입력 ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className='left-cover'>

          <div style={{width:'100%', height:'1px', backgroundColor:'#6d6d6d'}}></div>
          <section>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='유입경로'/>
                <DropdownBox
                  widthmain='50%' height='35px' selectedValue={''}
                  options={DropDownVisitPath}    
                  handleChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='이름'/>
                <input style={{width:'60%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='여행인원'/>
                <DropdownBox
                  widthmain='50%' height='35px' selectedValue={''}
                  options={DropDownNum}    
                  handleChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='연락처'/>
                <input style={{width:'50%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행상품'/>
                <input style={{width:'50%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행지'/>
                <DropdownBox
                  widthmain='50%' height='35px' selectedValue={''}
                  options={DropDownTourLocation}    
                  handleChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행기간'/>
                <div style={{paddingLeft:'5px', display:'flex', alignItems:'center'}}>
                  <DateBoxNum width='150px' subWidth='130px' right={15} setSelectDate={''} date={''} marginLeft={1}/>
                  <p>~</p>
                  <DateBoxNum width='150px' subWidth='130px' right={15} setSelectDate={''} date={''} marginLeft={1}/>
                </div>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='1인요금' height={160}/>
                <div style={{flex:1}}>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px'}}>성인</h3>
                    <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {}}/>
                    <p style={{marginRight:'10px'}}>원</p>
                    <DropdownBox
                      widthmain='20%' height='35px' selectedValue={''}
                      options={DropDownNum}    
                      handleChange={(e)=>{}}
                    />
                    <p>명</p>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px'}}>소아</h3>
                    <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {}}/>
                    <p style={{marginRight:'10px'}}>원</p>
                    <DropdownBox
                      widthmain='20%' height='35px' selectedValue={''}
                      options={DropDownNum}    
                      handleChange={(e)=>{}}
                    />
                    <p>명</p>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px'}}>유아</h3>
                    <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {}}/>
                    <p style={{marginRight:'10px'}}>원</p>
                    <DropdownBox
                      widthmain='20%' height='35px' selectedValue={''}
                      options={DropDownNum}    
                      handleChange={(e)=>{}}
                    />
                    <p>명</p>
                  </div>
                </div>
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='전체요금' height={160}/>
                <input style={{width:'50%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={''} className="inputdefault" type="text" 
                    onChange={(e) => {}}/>
                <p>원</p>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole bigHeight">
                <TitleBox width="100px" text='요청사항답변' height={120}/>
                <textarea 
                  className="textarea"
                  value={''}
                  onChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole bigHeight">
                <TitleBox width="100px" text='계약자혜택' height={120}/>
                <textarea 
                  className="textarea"
                  value={''}
                  onChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='견적유효기간'/>
                <div style={{paddingLeft:'5px', display:'flex', alignItems:'center'}}>
                  <DateBoxNum width='150px' subWidth='130px' right={15} setSelectDate={''} date={''} marginLeft={1}/>
                  <p>까지</p>
                </div>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole bigHeight">
                <TitleBox width="100px" text='주의사항' height={120}/>
                <textarea 
                  className="textarea"
                  value={''}
                  onChange={(e)=>{}}
                />
              </div>
            </div>
          </section>

          <div className='btn-box'>
            <div className="btn" 
              onClick={()=>{
                
              }}
            >
              <p>저장</p>
            </div>
          </div>

          <div style={{width:'100%', height:'1px', backgroundColor:'#6d6d6d'}}></div>

          <section>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='리조트보기'/>
                <input style={{width:'50%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='문의일정표'/>
                <input style={{width:'50%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole" >
                <div style={{padding:'10px'}}>
                  <p>KE 인천 오후출발/직항 4박6일 (2024.06.30~2024.07.05)</p>
                </div>
              </div>
            </div>

          </section>
        </div>
        
        {/* 오른쪽 바 데이터 입력 ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className='right-cover'>
         <div className="content">
            
            <section>
              <h1>온라인 계약서 (전자서명, 동의서)</h1>
              <div className="bottombar"></div>
              <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor: '#E2E2E2'}}>
                <TitleBox width="130px" text='날짜'/>
                <TitleBox width="20%" text='경로'/>
                <TitleBox width="20%" text='상태'/>
                <TitleBox width="25%" text='보기'/>
              </div>
              <div className="coverbox">
                <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                  <DateBoxNum width='130px' subWidth='110px' right={15}   setSelectDate={setTest} date={test} marginLeft={5}/>
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={''}
                    options={[
                      { value: '이메일', label: '이메일' },
                      { value: '이메일', label: '이메일' }
                    ]}    
                    handleChange={(e:any)=>{}}
                  />
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={''}
                    options={[
                      { value: '대기', label: '대기' },
                      { value: '전달', label: '전달' }
                    ]}    
                    handleChange={(e:any)=>{}}
                  />
                  <input style={{width:'25%', textAlign:'center'}}
                    value={''} className="inputdefault" type="text" 
                    onChange={(e) => {}}/>
                </div>
              </div>
            </section>

            

          </div>
        </div>

      </div>

  

    </div>
  )
}
