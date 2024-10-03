import ScheduleLocation from "./ScheduleLocation";

interface ScheduleElementHeaderProps {
  location?: string;
  time?: string;
  schedule: string;
}

export default function ScheduleElementHeader({
  location,
  time,
  schedule,
}: ScheduleElementHeaderProps) {
  return (
    <div className="schedule__element__header__wrapper">
      {location && <ScheduleLocation location={location} />}
      <div className="schedule__element__header">
        <div className="absolute__wrapper">
          <div className="dot__icon" />
        </div>
        <div className="schedule__text__wrapper">
          {time && <span>{time}</span>}
          <span>{schedule}</span>
        </div>
      </div>
    </div>
  );
}
