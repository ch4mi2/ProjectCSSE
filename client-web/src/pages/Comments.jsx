import OrderComments from "../components/OrderComments";
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

const Comments = () =>{
    const {id} = useParams();

    const [order,setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async() => {
            setLoading(true);
            const response = await fetch('/api/api/orders/' + id);
            console.log(response);
            const data = await response.json();
            console.log(data);

            if( response.ok ) {
                await setOrder(data);
            }
            setLoading(false);
        }
             
        fetchOrder(); 
    }, [])

    return(
        <div>
            <div className="px-10 pt-3 ">
            <h1 className="font-sans font-bold text-2xl leading-7">Purchase Order Details</h1>
            </div>
            <br />
            <div>
                { order ? <OrderComments key={order.id} order = {order} /> :<div> {loading && <LoadingScreen />}</div>}
            </div>
        </div>
    );
}

export default Comments;
