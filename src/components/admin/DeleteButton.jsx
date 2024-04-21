import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteButton = ({ onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowModal(false);
  };
  return (
    <>
      <div className="">
        <h3 className="" onClick={() => setShowModal(true)}>
          <FaRegTrashAlt />
        </h3>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-50 mx-auto max-w-5xl rounded-lg bg-white p-3 shadow-lg dark:border-strokedark dark:bg-boxdark">
            <div className="border-gray-300 flex items-end justify-end  pb-3">
              <button
                className="text-black"
                onClick={() => setShowModal(false)}
              >
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
            <div className="max-h-full overflow-y-auto">
              <div className="">
                <div className="">
                  <h3 className="font-bold text-black dark:text-white">
                    Are you sure you want to delete?
                  </h3>
                </div>
              </div>
            </div>
            <div className="border-gray-300 flex items-center  justify-end pt-4">
              <button
                className="text-red-500 mr-2 px-4 py-2 font-bold uppercase"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-red-500 cursor-pointer bg-danger px-3 py-2  text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeleteButton;
