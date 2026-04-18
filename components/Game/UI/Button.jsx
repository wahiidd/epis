export default function Button({
  variant = 'primary',
  children,
  onClick = () => {},
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={(e) => {
        // play click sound on any button press
        playSound('click.mp3');
        if (typeof onClick === 'function') onClick(e);
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
