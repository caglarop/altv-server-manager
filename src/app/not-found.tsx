export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[#0d0d0d] text-white">
      <h2 className="text-lg">Page not found</h2>
      <p className="text-gray-400">
        The page you are looking for does not exist. You might have mistyped the
        address or the page may have moved.
      </p>
    </div>
  );
}
