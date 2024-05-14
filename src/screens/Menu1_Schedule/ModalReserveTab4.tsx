import React from 'react'

export default function ModalReserveTab4(props:any) {
  return (
    <div>
      {/* <section>
          <h1>12. OT 및 고객전달 사항</h1>
          <div className="bottombar"></div>
          <div className="coverbox titlerow" style={{backgroundColor:'#E2E2E2' }}>
            <TitleBox width={120} text=''/>
            <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
              <TitleBox width={210} text='요청일'/>
              <TitleBox width={210} text='처리일'/>
              <TitleBox width={250} text='전달방식'/>
              <TitleBox width={250} text='담당자'/>
            </div>
          </div>
          {
            ["e-Ticket", "비자/ESTA", "확정서", "여행준비물", "캐리어사은품", "해피콜", "환불/과입금"].map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow hole">
                    <TitleBox width={120} text={item}/>
                    <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
                      <DateBoxKo date={startDate} func={handleSelectDateChange}/>
                      <DateBoxKo date={startDate} func={handleSelectDateChange}/>
                      <SelectBox 
                        notice={{ value: '선택', label: '선택' }}
                        widthmain={250} selectWidth={250} selectTextWidth={240}
                        data={[ 
                          { value: 'n1', label: '카톡' },
                          { value: 'n2', label: '전화' }
                        ]} 
                      />
                      <SelectBox 
                        notice={{ value: '선택', label: '선택' }}
                        widthmain={250} selectWidth={250} selectTextWidth={240}
                        data={[ 
                          { value: 'n1', label: '카톡' },
                          { value: 'n2', label: '전화' }
                        ]} 
                      />
                    </div>
                  </div>
                </div>

              )
            })
          }          
        </section> */}
    </div>
  )
}
