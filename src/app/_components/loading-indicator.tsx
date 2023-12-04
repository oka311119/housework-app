export function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{ borderTopColor: "transparent" }}
        className="mt-32 h-10 w-10 animate-spin rounded-full border-4 border-blue-200"
      />
      <p className="ml-4 mt-32 text-xl">loading...</p>
    </div>
  );
}
