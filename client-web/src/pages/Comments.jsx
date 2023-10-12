import OrderComments from "../components/OrderComments";

const Comments = () =>{
    return(
        <div>
            <div class="px-10 pt-3 ">
            <h1 class="font-sans font-bold text-2xl leading-7">Purchase Order Details</h1>
            </div>
            <br />
            <div>
                <OrderComments/>
            </div>
        </div>
    );
}

export default Comments;
