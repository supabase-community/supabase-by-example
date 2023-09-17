import { ReactNode } from "react";

type Props = {
  className: string;
  children: ReactNode;
};

export default function Alert({ className, children }: Props) {
  return (
    <div className={`alert ${className} shadow-lg rounded-none`}>
      <div>
        <span>{children}</span>
      </div>
    </div>
  );
}
