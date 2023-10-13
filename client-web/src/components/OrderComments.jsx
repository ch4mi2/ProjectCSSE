const detailList = [
    { id: 1 ,site: 'Colombo', site_manager: 'Emily Johnson', address: '01 Schofield Pl,Colombo 00300',amount: 125000.00,status:'Pending' },
];

const itemList = [
    {id:'B#123' , name:'steel' , qty:'20pcs'},
    {id:'C#123' , name:'wood' , qty:'50pcs'},
]

const OrderComments= () => {
    return(
        <div>
        <div class="border-black border-2 mx-10 px-20 py-4 rounded-md">
        <div><center><h3 class="mb-8 text-xl font-bold">Order Details</h3></center></div>
        <div>
        {detailList.map((data) => (
            <ul>
            <li>Site : {data.site}</li>
            <li class="my-2">Site Manager : {data.site_manager}</li>
            <li class="my-2">Address : {data.address}</li>
            <li class="my-2"><b>Total amount : Rs.{data.amount}</b></li>
            </ul>
        ))}
        </div>
        <div>
            <p class="my-4"><b>Restricted Items</b></p>
        </div>
        <div class="bg-[#FFF0BB] px-3 py-3">
            <div>
            <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {itemList.map((item)=>(
                    <tr>
                        <td class="whitespace-nowrap px-2 py-2">{item.id}</td>
                        <td class="whitespace-nowrap px-2 py-2">{item.name}</td>
                        <td class="whitespace-nowrap px-2 py-2">{item.qty}</td>
                    </tr>    
                ))}
                </tbody>
            </table>
            </div>
        </div>
        <div>
            <p class="my-4"><b>Comments</b></p>
        </div>
        <div>
            <p>wrytuytywoeuoq fuygiuoiup sgiquiouw hwuqpwpq huiohiyw joepopoiep wdciubj tuqwbbzkjks</p>
        </div>
        <div class="mr-20">
        <div>
            <button class="bg-[#1FDF00] text-black font-bold py-2 px-4 rounded-full mx-4 my-4">
                Approve
            </button>
            <button class="bg-[#FF3333] text-black font-bold py-2 px-4 rounded-full mx-4 my-4">
                Decline
            </button>
        </div>
        </div>
        </div>
        </div>
    )
}

export default OrderComments;