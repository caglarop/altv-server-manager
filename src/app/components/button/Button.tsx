export default function Button({
  children,
  onClick,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...props}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        onClick && onClick(e)
      }
      className="rounded bg-white/10 p-3 font-semibold transition hover:bg-primary hover:text-[#0d0d0d]"
    >
      {children}
    </button>
  );
}
