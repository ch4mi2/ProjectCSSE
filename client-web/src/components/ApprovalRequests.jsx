import viewDetails from '../assets/next.png'
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const orderList = [
    { id: 1 ,site: 'Colombo', site_manager: 'Emily Johnson', amount: 125000.00, status:'Pending' },
    { id: 2, site: 'Galle', site_manager: 'Elizabeth Martinez', amount: 375600.00, status:'Approved' },
    { id: 3, site: 'Kandy', site_manager: 'Olivia Taylor', amount: 185200.00, status:'Approved' },
    { id: 4, site: 'Mathara', site_manager: 'Daniel White', amount: 685000.00, status:'Declined' }
];


const ApprovalRequests = () => {
    // const navigate = useNavigate();

    // const handleRequest =()=>{
    //     navigate('/comments');
    // };

    return (
        <div>
            <div class="bg-[#e5e7eb] mx-10 mt-4">
            <div class="relative overflow-x-auto shadow-md">
                <table class="w-11/12 text-sm text-left text-gray-500 dark:text-gray-400 mx-10 my-10">
                    <thead class="text-s text-black font-bold uppercase bg-[#f4ca40] ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Site
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Site Manager
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Order Value (Rs.)
                            </th>
                            <th scope="col" class="px-6 py-3">
                               Status
                            </th>
                            <th></th>
                       </tr>
                    </thead>
                    <tbody>
                    {orderList.map((order,index) => (
                            <tr 
                                key = {index} 
                                class= {index%2 === 0
                                    ? "border text-s text-black bg-[#ffefbb] border-[#f4ca40] "
                                    : "border text-s text-black bg-[#ffffff] border-[#f4ca40] "}
                                >
                                    <td class="px-6 py-4">  
                                        {order.id}
                                    </td>
                                    <td class="px-6 py-4">
                                        {order.site}
                                    </td>
                                    <td class="px-6 py-4">
                                        {order.site_manager}
                                    </td>
                                    <td class="px-6 py-4">
                                        {order.amount}
                                    </td>
                                    <td class="px-6 py-4">
                                        {order.status}
                                    </td>
                                    <td class="px-6 py-4">
                                        <Link to = '/comments'>
                                            <img src={viewDetails} className="object-scale-down h-4 w-4"></img>
                                        </Link>
                                    </td>
                            </tr>
                    ))}
                    </tbody>  
                </table>
            </div>    
            </div>  
        </div>
    )
}

export default ApprovalRequests;



