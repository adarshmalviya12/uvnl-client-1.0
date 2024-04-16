import { useState } from "react";

const ViewImage = ({ imageName, imageLink }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-primary text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        view {imageName}
      </button>
      {showModal && (
        <div className="justify-center z-9999 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-black outline-none focus:outline-none">
              {/*header*/}
              <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                <h3 className="font-medium text-title-sm text-black dark:text-white">
                  {imageName}
                </h3>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto overflow-y-auto max-h-80 md:max-h-90 lg:max-h-115">
                <img src={imageLink} alt="loading" className="max-w-80" />
              </div>
              {/*footer*/}
              <div className="flex items-center text-title-sm justify-end gap-2 p-4 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="inline-flex items-center justify-center bg-danger px-1 py-1 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="inline-flex items-center justify-center bg-primary py-1 px-2 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ViewImage;
