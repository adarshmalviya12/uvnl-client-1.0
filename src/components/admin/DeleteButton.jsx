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
        <div className="fixed inset-0 z-9999 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-50 max-w-5xl p-3 mx-auto bg-white rounded-lg shadow-lg dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-end justify-end pb-3  border-gray-300">
              <button
                className="text-black"
                onClick={() => setShowModal(false)}
              >
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
            <div className="overflow-y-auto max-h-full">
              <div className="">
                <div className="">
                  <h3 className="font-bold text-black dark:text-white">
                    Are you sure you want to delete?
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end  pt-4 border-gray-300">
              <button
                className="text-red-500 font-bold uppercase px-4 py-2 mr-2"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-red-500 py-2 px-3 text-center font-medium  bg-danger text-white hover:bg-opacity-90 lg:px-4 xl:px-6 cursor-pointer"
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
