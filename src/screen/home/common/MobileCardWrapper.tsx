import { ReactNode } from "react";

export default function MobileCardWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mobile__card__container">
      <div className="mobile__card__wrapper">{children}</div>
    </div>
  );
}
