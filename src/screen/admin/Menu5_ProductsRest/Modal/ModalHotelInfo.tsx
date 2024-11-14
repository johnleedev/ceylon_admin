import React, { useCallback, useState } from 'react'
import './ModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import MainURL from '../../../../MainURL';


export default function ModalHotelInfo (props : any) {
  
  const userId = sessionStorage.getItem('userId');
  const infoData = props.hotelInfo;

  const imageNamesAllView = infoData.imageNamesAllView ? JSON.parse(infoData.imageNamesAllView) : [];
  const imageNamesRoomView = infoData.imageNamesRoomView ? JSON.parse(infoData.imageNamesRoomView) : [];
  const imageNamesEtcView = infoData.imageNamesEtcView ? JSON.parse(infoData.imageNamesEtcView) : [];

  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewHotelInfoModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>{infoData.hotelNameKo} {infoData.hotelNameEn}</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품노출'/>
            <div className='checkInputCover'>
              <p>{infoData.isView === true ? '노출' : '미노출'}</p>
            </div>
          </div>
        </div>
       <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='국가/도시'/>
            <p>{infoData.nation}</p>
            <p>{infoData.city}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품뱃지'/>
            <p>{infoData.label}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='호텔명(한글)'/>
            <p>{infoData.hotelNameKo}</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='호텔명(영문)'/>
            <p>{infoData.hotelNameEn}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='호텔성급'/>
            <p>{infoData.hotelLevel}</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='구분'/>
            <p>{infoData.hotelSort}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='호텔주소'/>
            <p>{infoData.hotelAddress}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='호텔연락처'/>
            <p>{infoData.hotelPhone}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='간략소개' height={200}/>
            <p>{infoData.hotelNotice}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='부대시설'/>
            <p>{infoData.hotelConvenience}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='체크인'/>
            <p>{infoData.hotelCheckIn}</p>
          </div>
          <div className="coverrow hole">
            <TitleBox width="120px" text='체크아웃'/>
            <p>{infoData.hotelCheckOut}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='반려동물'/>
            <p>{infoData.hotelAllowPet}</p>
          </div>
          <div className="coverrow hole">
            <TitleBox width="120px" text='주차'/>
            <p>{infoData.hotelParking}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='구글위치'/>
            <p>{infoData.googleLocation}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='키워드/해시태그'/>
            <p>{infoData.keywordHashtag}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='고객별점/평점'/>
            <p>{infoData.customerScore}</p>
          </div>
        </div>
      </section>

      <div className="modal-header">
        <h1>이미지</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='전경'/>
            <div style={{flexDirection:'column', width:'90%'}}>
            { imageNamesAllView.length > 0 &&
              imageNamesAllView.map((item:any, index:any)=>{
                return (
                  <div key={index} style={{display:'flex', alignItems:'center'}}>
                    <div style={{width:'20%', display:'flex', alignItems:'center'}}>
                      <p>{index+1}.</p>
                      <img style={{width:'100px', marginLeft:'10px'}}
                          src={`${MainURL}/images/hotelimages/${item.imageName}`}
                        />
                    </div>
                    <p style={{width:'10%'}}>{item.title}</p>
                    <p style={{width:'70%'}}>{item.notice}</p>
                  </div>
                )
              })
            }
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='객실'/>
            <div style={{flexDirection:'column', width:'90%'}}>
            { imageNamesRoomView.length > 0 &&
              imageNamesRoomView.map((item:any, index:any)=>{
                return (
                  <div key={index} style={{display:'flex', alignItems:'center'}}>
                    <div style={{width:'20%', display:'flex', alignItems:'center'}}>
                      <p>{index+1}.</p>
                      <img style={{width:'100px', marginLeft:'10px'}}
                          src={`${MainURL}/images/hotelimages/${item.imageName}`}
                        />
                    </div>
                    <p style={{width:'10%'}}>{item.title}</p>
                    <p style={{width:'70%'}}>{item.notice}</p>
                  </div>
                )
              })
            }
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='부대시설'/>
            <div style={{flexDirection:'column', width:'90%'}}>
            { imageNamesEtcView.length > 0 &&
              imageNamesEtcView.map((item:any, index:any)=>{
                return (
                  <div key={index} style={{display:'flex', alignItems:'center'}}>
                    <div style={{width:'20%', display:'flex', alignItems:'center'}}>
                      <p>{index+1}.</p>
                      <img style={{width:'100px', marginLeft:'10px'}}
                          src={`${MainURL}/images/hotelimages/${item.imageName}`}
                        />
                    </div>
                    <p style={{width:'10%'}}>{item.title}</p>
                    <p style={{width:'70%'}}>{item.notice}</p>
                  </div>
                )
              })
            }
            </div>
          </div>
        </div>

      </section>

    </div>     
  )
}
