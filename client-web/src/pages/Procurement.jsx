import ApprovalRequests from '../components/ApprovalRequests';

const Procurement = () => {
  return (
    <div>
      <div className="px-10 pt-10 ">
        <h1 className="font-sans font-bold text-2xl leading-7">
          Purchase Orders
        </h1>
      </div>
      <br />
      <div>
        <ApprovalRequests />
      </div>
    </div>
  );
};

export default Procurement;
