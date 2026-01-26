const Input = ({
  name,
  placeholder,
  value,
  type = "text",
  onChange,
  className = "",
  label,
  
  
  ...rest
}) => {
  const inputId = `input-${name}`;
  

  return (
    <div className="flex flex-col items-start gap-3">
      {label && (
        <label htmlFor={inputId} className="text-xs font-normal text-[#868686] ">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        {...rest}
      />
    </div>
  );
};

export default Input;
