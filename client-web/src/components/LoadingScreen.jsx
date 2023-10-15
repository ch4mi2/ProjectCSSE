const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
      <div className="flex justify-center items-center h-screen static">
        <div className="relative inline-flex">
          <div className="w-8 h-8 bg-[#f4ca40] rounded-full"></div>
          <div className="w-8 h-8 bg-[#f4ca40] rounded-full absolute top-0 left-0 animate-ping"></div>
          <div className="w-8 h-8 bg-[#f4ca40] rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
