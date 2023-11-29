function SkeletonItem() {
  return (
    <div className="space-y-5 rounded-2xl bg-gray-50100 p-4 py-6 animate-pulse">
      <div className="h-32 rounded-lg bg-[#00000033]"></div>
      <div className="space-y-3">
        <div className="h-4 w-3/5 rounded-lg bg-[#00000033]"></div>
        <div className="h-4 w-4/5 rounded-lg bg-[#00000033]"></div>
        <div className="h-4 w-2/5 rounded-lg bg-[#00000033]"></div>
        <div className="h-4 w-4/5 rounded-lg bg-[#00000033]"></div>
      </div>
    </div>
  );
}

export default SkeletonItem;
