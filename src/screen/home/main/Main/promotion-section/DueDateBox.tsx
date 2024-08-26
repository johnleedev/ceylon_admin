export default function DueDateBox({ dueDate }: { dueDate: string }) {
  const getDueDate = (dueDate: string) => {
    const dueDateToDate = new Date(dueDate);
    const currentDate = new Date();
    const timeDiff = dueDateToDate.getTime() - currentDate.getTime();
    const dayCoef = 1000 * 60 * 60 * 24;
    const dateDiff = Math.ceil(timeDiff / dayCoef);
    return dateDiff < 0 ? "종료" : `D-${dateDiff}`;
  };
  return <div className="duedate__box__wrapper">{getDueDate(dueDate)}</div>;
}
