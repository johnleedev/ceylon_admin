import React from 'react'

export default function ModalReserveTab3(props:any) {
  return (
    <div>
       {/* <section>
          <h1>11. 입금내역</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow third rightborder">
              <TitleBox width={120} text='계약금액'/>
              <InputBox width={250} value={''} func={(e)=>{}} />
              <p>원</p>
            </div>
            <div className="coverrow third rightborder" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <h3 style={{marginRight:'20px'}}>추가경비:</h3>
              <h3 style={{fontSize:'20px'}}>0</h3>
            </div>
            <div className="coverrow third" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <h3 style={{marginRight:'20px'}}>최종 여행경비:</h3>
              <h3 style={{fontSize:'20px'}}>0</h3>
            </div>
          </div>
          {
            ["계약금", "항공료", "중도금", "잔금", "추가경비"].map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow third rightborder">
                    <TitleBox width={120} text={item}/>
                    <InputBox width={250} value={''} func={(e)=>{}} />
                    <p>원</p>
                  </div>
                  <div className="coverrow third rightborder" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <DateBoxKo date={startDate} func={handleSelectDateChange}/>
                  </div>
                  <div className="coverrow third" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <SelectBox 
                      notice={{ value: '선택', label: '선택' }}
                      widthmain={150} selectWidth={150} selectTextWidth={140}
                      data={[ 
                        { value: 'n1', label: '현금' },
                        { value: 'n2', label: '카드' }
                      ]} 
                    />
                    <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <input className="input" type="checkbox"
                        checked={isChecked}
                        onChange={()=>{setIsChecked(!isChecked);}}
                        style={{width:'20px', height:'20px', backgroundColor:'red'}}
                      />
                    </div>
                    <p>입금확인</p>
                  </div>
                </div>
              )
            })
          }
          <div className="coverbox">
            <div className="coverrow third rightborder">
              <TitleBox width={120} text='환불'/>
              <InputBox width={250} value={''} func={(e)=>{}} />
              <p>원</p>
            </div>
            <div className="coverrow third rightborder" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='밸런스'/>
              <InputBox width={1200} value={''} func={(e)=>{}} />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow third rightborder">
              <TitleBox width={120} text='현금영수증'/>
              <RadioBox text='요청없음' width={100} selectedValue={selectedValue} func={()=>{}} />
              <RadioBox text='발급요청' width={100} selectedValue={selectedValue} func={()=>{}} />
            </div>
            <div className="coverrow" style={{width:'65%'}}>
              <RadioBox text='소득공제' width={100} selectedValue={selectedValue} func={()=>{}} />
              <RadioBox text='지출증빙' width={100} selectedValue={selectedValue} func={()=>{}} />
              <h3 style={{marginLeft:'50px'}}>인증번호</h3>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <h3 style={{marginLeft:'30px'}}>발급일</h3>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            </div>
          </div>
        </section> */}
    </div>
  )
}
