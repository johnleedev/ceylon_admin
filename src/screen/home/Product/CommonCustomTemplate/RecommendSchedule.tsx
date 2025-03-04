import "./RecommendSchedule.scss";
import { useEffect, useState } from "react";
import { FaCheck, FaRegCircle, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import MainURL from "../../../../MainURL";
import { MdOutlineCalendarToday } from "react-icons/md";
import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import AirlineData from "../../../AirlineData";
import locationIcon from "../../images/tourPage/location.png"
import hotelbuildingIcon from "../../images/tourPage/hotelbuilding.png"
import hotelplateIcon from "../../images/tourPage/hotelplate.png"
import RatingBoard from "../../common/RatingBoard";



interface SelectScheduleListProps {
  day : string;
  breakfast :string;
  lunch:string;
  dinner :string;
  hotel:string;
  score:string;
  scheduleDetail: ScheduleDetailProps[];
}

 
interface ScheduleDetailProps {
  id : string;
  sort: string;
  location: string;
  subLocation : string;
  locationTitle : string;
  locationContent : string;
  locationContentDetail : {name:string; notice:string[]}[];
  postImage : string;
}

export default function RecommendSchedule(props:any) {
  
  const [flightType, setFlightType] = useState("직항");
  const [scheduleList, setScheduleList] = useState<SelectScheduleListProps[]>(props.scheduleList);
  const [airlineName, setAirlineName] = useState('');
  const [departAirport, setDepartAirport] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [arriveAirport, setArriveAirport] = useState('');
  const [arriveTime, setArriveTime] = useState('');
  const [airlineNameVia, setAirlineNameVia] = useState('');
  const [departAirportVia, setDepartAirportVia] = useState('');
  const [departTimeVia, setDepartTimeVia] = useState('');
  const [arriveAirportVia, setArriveAirportVia] = useState('');
  const [arriveTimeVia, setArriveTimeVia] = useState('');


  return (
    <div className="custom-scheduleType-recommendschedule">

      { 
        scheduleList.map((item:any, index:any)=>{

          return props.selectScheduleDay === index+1 && (
            <div className="schedule__table__wrapper" key={index}>
              <div className="schedule__header">
                <span className="main__text">{index+1} DAY</span>
                <span className="sub__text">2024-10-16(토)</span>
              </div>
              <div className="schedule__main__wrapper">
                {
                  index === 0 &&
                  <>
                  { flightType === '직항'
                    ?
                    <div className="schedule__element__wrapper">
                      <div className="flight__schedule__board__wrapper">
                        <div className="flight__schedule__board">
                          <div className="flight__info__wrapper">
                            <img src={AirlineData.KE} alt="temp" />
                            <span>{airlineName}</span>
                          </div>
                          <div className="flight__time__wrapper">
                            <span className="flight__time">07시간 30분</span>
                            <div className="depart__info">
                              <div />
                              <span className="time__text">{departTime}</span>
                              <span className="airport__text">{departAirport} 출발</span>
                            </div>
                            <div className="arrive__info">
                              <div />
                              <span className="time__text">{arriveTime}</span>
                              <span className="airport__text">{arriveAirport} 도착</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    <div className="schedule__element__wrapper">
                      <div className="flight__schedule__board__wrapper">
                        <div className="flight__schedule__board" style={{marginBottom:'50px'}}>
                          <div className="flight__info__wrapper">
                            <img src={AirlineData.KE} alt="temp" />
                            <span>{airlineName}</span>
                          </div>
                          <div className="flight__time__wrapper">
                            <span className="flight__time">07시간 30분</span>
                            <div className="depart__info">
                              <div />
                              <span className="time__text">{departTime}</span>
                              <span className="airport__text">{departAirport} 출발</span>
                            </div>
                            <div className="arrive__info">
                              <div />
                              <span className="time__text">{arriveTime}</span>
                              <span className="airport__text">{arriveAirport} 도착</span>
                            </div>
                          </div>
                        </div>
                        <div className="flight__schedule__board">
                          <div className="flight__info__wrapper">
                            <img src={AirlineData.KE} alt="temp" />
                            <span>{airlineNameVia}</span>
                          </div>
                          <div className="flight__time__wrapper">
                            <span className="flight__time">07시간 30분</span>
                            <div className="depart__info">
                              <div />
                              <span className="time__text">{departTimeVia}</span>
                              <span className="airport__text">{departAirportVia} 출발</span>
                            </div>
                            <div className="arrive__info">
                              <div />
                              <span className="time__text">{arriveTimeVia}</span>
                              <span className="airport__text">{arriveAirportVia} 도착</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  </>
                  
                }
                {
                  item.scheduleDetail.map((subItem:any, subIndex:any)=>{

                    return (
                      <div className="schedule__element__wrapper" key={subIndex}>
                        <div className="schedule__element__header__wrapper">
                          {
                            subItem.location !== '' &&
                            <div className="schedule__location__wrapper">
                              <div className="location__absolute__wrapper">
                                <img src={locationIcon} style={{width:'46px'}}/>
                              </div>
                              <span className="location__text">{subItem.location}</span>
                            </div>
                          }
                        </div>
                        {
                          subItem.locationDetail.map((detailItem:any, detailIndex:number)=>{
                            return (
                              <div key={detailIndex}>
                                <div className="schedule__element__header__wrapper">
                                  <div className="schedule__element__header">
                                    <div className="absolute__wrapper">
                                      <div className="dot__icon" />
                                    </div>
                                    <div className="schedule__text__wrapper">
                                      <span>{detailItem.subLocation}</span>
                                    </div>
                                  </div>
                                </div>
                                {
                                  detailItem.subLocationDetail.map((subDetailItem:any, subDetailIndex:number)=>{

                                    const postImages = subDetailItem.postImage ? JSON.parse(subDetailItem.postImage) : "";

                                    return (
                                      <div className="schedule__element__main__wrapper" key={subDetailIndex}>
                                        <div className="image__wrapper">
                                          <div className="imagebox">
                                            <img style={{height:'100%', width:'100%'}}
                                              src={`${MainURL}/images/scheduleboximages/${postImages[0]}`}
                                            />                                                
                                          </div>
                                        </div>
                                        <div className="table__wrapper">
                                          <div className="table__header">
                                            <span>{subDetailItem.locationTitle}</span>
                                          </div>
                                          <div className="table__main">
                                            <span>{subDetailItem.locationContent}</span>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            )
                          })
                        }
                        </div>
                    )
                  })
                }
              </div>

              <div className="additional__schedule__wrapper">
                <div className="index__wrapper">
                  <img src={hotelplateIcon} style={{height:'24px'}}/>
                  <span>식사</span>
                </div>
                <div className="meal__info__wrapper">
                  <span>[조식] {item.breakfast ? item.breakfast : "없음"}</span>
                  <span>[중식] {item.lunch ? item.lunch : "없음"}</span>
                  <span>[석식] {item.dinner ? item.dinner : "없음"}</span>
                </div>
              </div>
              <div className="additional__schedule__wrapper">
                <div className="index__wrapper">
                  <img src={hotelbuildingIcon} style={{height:'24px'}}/>
                  <span>호텔</span>
                </div>
                <div className="additional__info__wrapper">
                  <p>{item.hotel}</p>
                  <div className="additional__rating__wrapper">
                    <RatingBoard rating={parseInt(item.score)} />
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
