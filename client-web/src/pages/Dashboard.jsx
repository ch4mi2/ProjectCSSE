import { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import AnalyticsChart from '../components/AnalyticsChart';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      const response = await fetch('/api/api/orders/total/');
      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        setTotalAmount(data.totalAmount);
      } else {
        console.log('error');
      }
      setLoading(false);
    };

    fetchPolicies();
  }, []);

  return (
    <div>
      <div className="ml-9 mt-5">
        <h1 className="font-sans font-bold text-3xl leading-7">Dashboard</h1>
      </div>
      <div className="grid justify-items-center">
        {totalAmount && (
          <div className=" mx-10 mt-20 w-6/12">
            <div className=" bg-[#e5e7eb] relative overflow-x-auto shadow-md py-4 rounded-md">
              {/* <div className="grid grid-cols-2 gap-6 ">
                <div className="justify-self-end font-sans font-bold text-xl">
                  Total Purchases:
                </div>
                <div className="justify-self-start font-sans font-bold text-2xl ">
                  Rs. {totalAmount.toLocaleString('en-UN')}
                </div>
              </div> */}
              <div className="flex flex-row justify-center">
                <div className="font-sans font-bold text-xl basis-2/5 ml-48">
                  Total Purchases:
                </div>
                <div className="justify-self-start font-sans font-bold text-2xl basis-3/5">
                  Rs. {totalAmount.toLocaleString('en-UN')}
                </div>
              </div>
            </div>
          </div>
        )}

        <AnalyticsChart />
      </div>
      {loading && <LoadingScreen />}
    </div>
  );
};
export default Dashboard;
