import Sidebar from "@/app/personaldashboard/dashboard/Sidebar"
const personaldashboard=()=>{
    return (
        <div className="min-h-screen bg-black">
        {/* Sidebar */}
        <div className="flex">
          <Sidebar/>
  
          {/* Main content */}
          <main className="flex-1">
            <div className="p-6">
              {/* Header */}
              <header className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <div className="flex items-center">
                  <input type="search" placeholder="Search" className="form-input rounded" />
                  {/* Other header content */}
                </div>
              </header>
  
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                {/* Card components */}
                {/* ... */}
              </div>
  
              {/* Charts */}
              <div className="flex flex-col md:flex-row gap-4 my-4">
                {/* Bar Chart Placeholder */}
                <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                  <h2 className="text-lg font-semibold mb-4">User in The Last Week</h2>
                  {/* Placeholder for Bar Chart */}
                  <div className="h-64 bg-gray-200 rounded">Bar Chart</div>
                </div>
                
                {/* Pie Chart Placeholder */}
                <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                  <h2 className="text-lg font-semibold mb-4">Monthly Profits</h2>
                  {/* Placeholder for Pie Chart */}
                  <div className="h-64 bg-gray-200 rounded">Pie Chart</div>
                </div>
              </div>
  
              {/* Recent Sales and Last Orders */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Recent Sales */}
                <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                  <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
                  {/* List of recent sales */}
                </div>
  
                {/* Last Orders */}
                <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                  <h2 className="text-lg font-semibold mb-4">Last Orders</h2>
                  {/* List of last orders */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
}
export default personaldashboard;