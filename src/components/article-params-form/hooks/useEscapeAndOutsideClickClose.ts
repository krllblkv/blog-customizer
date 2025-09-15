import { useEffect } from 'react';

interface UseEscapeAndOutsideClickCloseProps {
  isOpen: boolean;
  rootRef: React.RefObject<HTMLElement>;
  onChange: (isOpen: boolean) => void;
}

export const useEscapeAndOutsideClickClose = ({
  isOpen,
  rootRef,
  onChange,
}: UseEscapeAndOutsideClickCloseProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        onChange(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onChange(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onChange, rootRef]);
};