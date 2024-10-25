export default function Input({
  value,
  onChange,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <input
      {...props}
      type={props.type || "text"}
      placeholder={props.placeholder || ""}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange && onChange(e)
      }
      className={`rounded border border-white/10 bg-transparent p-3 !outline-none !ring-0 transition hover:border-white focus:border-primary ${props.className}`}
    />
  );
}
