interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({ label, disabled, onClick }: ButtonProps) => {
  const bgColor = disabled ? 'bg-gray-400' : 'bg-cyan-500';
  const hoverColor = disabled ? '' : 'hover:bg-blue-700';
  return (
    <button
      className={`${bgColor} ${hoverColor} bg-cyan-500 text-black font-bold py-2 px-4 rounded transition duration-300`}
      disabled={disabled || false}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
