import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import MainURL from '../../../../MainURL';
import { ImLocation } from 'react-icons/im';


export default function ModalSelectScheduleBox (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const nation = props.nation ? props.nation : '';
  const indexCopy = props.index ? props.index : 0;
  const subIndexCopy = props.subIndex ? props.subIndex : 0
  const detailIndexCopy = props.detailIndex ? props.detailIndex : 0;
  const subDetailIndexCopy = props.subDetailIndex ? props.subDetailIndex : 0;
  const tourLocationList = props.selectedTourLocationList ? props.selectedTourLocationList : [];

  return (
    <div className='modal-addinput' style={{width:'100%', height:'700px', overflowY:'auto'}}>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            const viewAutoCopy = [...props.viewAutoCompleteTourLocation];
            viewAutoCopy[indexCopy][subIndexCopy][detailIndexCopy][subDetailIndexCopy] = false;
            props.setViewAutoCompleteTourLocation(viewAutoCopy)
            props.setIsViewSelectScheduleBoxModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
       <div className="modal-header">
        <h1>{nation} 일정박스</h1>
      </div>

      <section>
      <div className="bottombar"></div>
      { tourLocationList.length > 0 
        ?
        tourLocationList.map((subItem:any, subIndex:any)=>{ 

          const postImages = subItem.postImage ? JSON.parse(subItem.postImage) : "";

          return (
            <div className='input-area selectScheduleboxList' key={subIndex}
              onClick={()=>{
                const copy = [...props.scheduleList];
                copy[indexCopy].scheduleDetail[subIndexCopy].locationDetail[detailIndexCopy].subLocationDetail[subDetailIndexCopy].postImage = subItem.postImage;
                copy[indexCopy].scheduleDetail[subIndexCopy].locationDetail[detailIndexCopy].subLocationDetail[subDetailIndexCopy].locationTitle = subItem.locationTitle;
                copy[indexCopy].scheduleDetail[subIndexCopy].locationDetail[detailIndexCopy].subLocationDetail[subDetailIndexCopy].locationContent = subItem.locationContent;
                props.setScheduleList(copy);
                const viewAutoCopy = [...props.viewAutoCompleteTourLocation];
                viewAutoCopy[indexCopy][subIndexCopy][detailIndexCopy][subDetailIndexCopy] = false;
                props.setViewAutoCompleteTourLocation(viewAutoCopy)
                props.setIsViewSelectScheduleBoxModal(false);
              }}
            >
              <div className="cover">
                <div className="selectBtn-box">
                  <p>선택</p>
                </div>
                <div className='rowbox'>
                  <div className='icon-box'>
                    <ImLocation color='#5fb7ef' size={20}/>
                  </div>
                  <input style={{width:'45%'}} value={subItem.location} 
                    className="inputdefault" type="text" maxLength={100}
                  />
                </div>
                <div className='rowbox'>
                  <div className="icon-box">
                    <div className="dot__icon" />
                  </div>
                  <input style={{width:'45%'}} value={subItem.subLocation} 
                    className="inputdefault" type="text" maxLength={100}
                    onChange={(e) => {
                      // setSubLocation(e.target.value);
                    }}/>
                </div>
                <div className='rowbox'>
                  <div className="icon-box">
                  </div>
                  <div className='scheduletextbox'>
                    <div className="scheduletextbox-imagebox">
                      <div className="imagebox">
                        <img style={{height:'100%', width:'100%'}}
                          src={`${MainURL}/images/scheduleboximages/${postImages[0]}`}
                        />                                                
                      </div>
                    </div>
                    <div className="scheduletextbox-textbox">
                      <input style={{width:'95%'}} value={subItem.locationTitle} 
                          className="inputdefault" type="text" maxLength={100}
                          onChange={(e) => {
                            // setLocationTitle(e.target.value);
                          }}/>
                      <textarea 
                          className="textarea" style={{minHeight: '150px'}}
                          maxLength={300}
                          value={subItem.locationContent}
                          onChange={(e)=>{
                            // setLocationContent(e.target.value)
                          }}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        :
        <div style={{marginTop:'50px'}}>
          <p>등록된 일정박스가 없습니다.</p>
        </div>
      }
            
      </section>
      
      
    </div>     
  )
}
