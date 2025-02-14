import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import MainURL from '../../../../MainURL';
import { ImLocation } from 'react-icons/im';


export default function ModalSelectScheduleDetailBox (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const nation = props.nation ? props.nation : '';
  const indexCopy = props.index ? props.index : 0;
  const subIndexCopy = props.subIndex ? props.subIndex : 0
  const detailIndexCopy = props.detailIndex ? props.detailIndex : 0;
  const subDetailIndexCopy = props.subDetailIndex ? props.subDetailIndex : 0;
  const detailLocationList = props.detailLocationList ? props.detailLocationList : [];
  
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
        <h1>{nation} 세부일정박스</h1>
      </div>

      <section>
      <div className="bottombar"></div>
      { detailLocationList.length > 0 
        ?
        detailLocationList.map((subItem:any, subIndex:any)=>{ 

          const postImages = subItem.inputImage ? JSON.parse(subItem.inputImage) : "";

          return (
            <div className='input-area selectScheduleboxList' key={subIndex}
              onClick={()=>{
                const copy = [...props.scheduleList];
                copy[indexCopy].scheduleDetail[subIndexCopy].locationDetail[detailIndexCopy].subLocationDetail[subDetailIndexCopy].postImage = subItem.inputImage;
                copy[indexCopy].scheduleDetail[subIndexCopy].locationDetail[detailIndexCopy].subLocationDetail[subDetailIndexCopy].locationTitle = subItem.productName;
                copy[indexCopy].scheduleDetail[subIndexCopy].locationDetail[detailIndexCopy].subLocationDetail[subDetailIndexCopy].locationContent = subItem.detailNotice;
                props.setScheduleList(copy);
                const viewAutoCopy = [...props.viewAutoCompleteTourLocation];
                viewAutoCopy[indexCopy][subIndexCopy][detailIndexCopy][subDetailIndexCopy] = false;
                props.setViewAutoCompleteTourLocation(viewAutoCopy)
                props.setIsViewSelectScheduleBoxModal(false);
              }}
            >
              <div className="cover">
                <div className='rowbox'>
                  <div className='scheduletextbox'>
                    <div className="scheduletextbox-imagebox">
                      <div className="imagebox">
                        <img style={{height:'100%', width:'100%'}}
                          src={`${MainURL}/images/scheduledetailboximages/${postImages[0]}`}
                        />                                                
                      </div>
                    </div>
                    <div className="scheduletextbox-textbox">
                      <div style={{width:'95%', display:'flex', alignItems:'center'}} className="inputdefault" 
                      >{subItem.productName}</div>
                      <div className="textarea" style={{minHeight: '150px'}}
                      >{subItem.detailNotice}</div>
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
