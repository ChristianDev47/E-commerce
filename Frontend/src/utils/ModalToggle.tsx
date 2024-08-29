import { useState, useEffect, MouseEvent, FC } from "react";

interface ModalToggleProps {
  modalId: string;
  toggleButtonId: string;
  ModalComponent: React.ElementType;
  className?: string;
  title: string | JSX.Element; 
  searchRef?: React.RefObject<HTMLInputElement>;
}

const ModalToggle: FC<ModalToggleProps> = ({
  modalId,
  toggleButtonId,
  ModalComponent,
  className,
  title,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeModal = () => setIsOpen(false);

    if (isOpen) {
      document.addEventListener("click", closeModal);
    } else {
      document.removeEventListener("click", closeModal);
    }

    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [isOpen]);

  const handleToggleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="">
      <button
        id={toggleButtonId}
        onClick={handleToggleClick}
        className={className}
        title={typeof title === 'string' ? title : undefined} 
      >
        {title}
      </button>
      {isOpen && (
        <div id={modalId} onClick={(e) => e.stopPropagation()}>
          <ModalComponent {...props} closeModal={() => setIsOpen(false)}/>
        </div>
      )}
    </div>
  );
};

export default ModalToggle;
