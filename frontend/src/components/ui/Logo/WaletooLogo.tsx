const WaletooLogo = ({ showName = true }: { showName?: boolean }) => {
  return (
    <div className="flex w-full items-center gap-2">
      {!showName && <span className="mx-auto text-center text-2xl font-medium uppercase">W</span>}
      {showName && <span className="text-xl font-medium uppercase">Waletoo</span>}
    </div>
  );
};

export default WaletooLogo;
