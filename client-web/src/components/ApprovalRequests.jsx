import viewDetails from '../assets/next.png';
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useOrderContext} from '../hooks/useOrderContext';
import LoadingScreen from './LoadingScreen';

const ApprovalRequests = () => {
  const { orders, dispatch } = useOrderContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchOrders = async() =>{
      setLoading(true);
      const response = await fetch('/api/api/orders/');
      console.log(response);
      let data = await response.json()
      data = data.filter(request => request.state !== 'draft');
      data = data.filter(request => request.state !== 'delivering');
      console.log(data);

      if(response.ok){
        dispatch({ type: 'SET_ORDERS', payload: data });
      } else {
        console.log('error');
      }
      setLoading(false);
    }
    fetchOrders();
  },[]);

  const handleRequest =(id)=>{
    console.log("Navigating to /comments/", id);
      navigate(`/comments/${id}`);
  };

  return (
    <div>
      <div className="bg-[#e5e7eb] mx-10 mt-4">
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-11/12 text-sm text-left text-gray-500 dark:text-gray-400 mx-10 my-10">
            <thead className="text-s text-black font-bold uppercase bg-[#f4ca40] ">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  ID
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Site
                </th>
                <th scope="col" className="px-6 py-3">
                  Site Manager
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Value (Rs.)
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? 'border text-s text-black bg-[#ffefbb] border-[#f4ca40] '
                      : 'border text-s text-black bg-[#ffffff] border-[#f4ca40] '
                  }
                >
                  {/* <td className="px-6 py-4">{order.id}</td> */}
                  <td className="px-6 py-4">{order.mainSite.name}</td>
                  <td className="px-6 py-4">{order.mainSite.siteManager}</td>
                  <td className="px-6 py-4">{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">{order.state}</td>
                  <td className="px-6 py-4">
                    <img
                      src={viewDetails}
                      className="object-scale-down h-4 w-4"
                      onClick = {() => handleRequest(order.id)}
                    ></img>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {loading && <LoadingScreen />}
    </div>
  );
};

export default ApprovalRequests;
