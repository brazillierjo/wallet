import { FC } from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionButton: FC<ActionButtonProps> = ({ icon, onClick }) => (
  <button type="button" onClick={onClick}>
    {icon}
  </button>
);

export default ActionButton;
