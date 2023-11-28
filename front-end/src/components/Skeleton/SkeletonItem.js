function SkeletonItem() {
  return (
    <div class="space-y-5 rounded-2xl bg-gray-50100 p-4 py-6 animate-pulse">
      <div class="h-32 rounded-lg bg-[#00000033]"></div>
      <div class="space-y-3">
        <div class="h-4 w-3/5 rounded-lg bg-[#00000033]"></div>
        <div class="h-4 w-4/5 rounded-lg bg-[#00000033]"></div>
        <div class="h-4 w-2/5 rounded-lg bg-[#00000033]"></div>
        <div class="h-4 w-4/5 rounded-lg bg-[#00000033]"></div>
      </div>
    </div>
  );
}

export default SkeletonItem;
