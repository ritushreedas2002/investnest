const Sidebar = () => {
  return (
    <div className="w-44 h-full">
      <div className="overflow-y-auto py-4 px-3 bg-[#67C6E3]/80 backdrop-blur-md">
        {/* ... sidebar content */}
        <div className="mt-36 text-white border-b-4 p-5 text-lg text-center">
          <div className="group p-4">
            <div className="text-lg mb-4 group-hover:backdrop-blur-md group-hover:bg-white/20 group-hover:w-36 transition-all duration-300">
              Dashboard
            </div>
          </div>
          <div className="text-lg mb-4 ">Income</div>
          <div className="text-lg mb-4">Expense</div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
