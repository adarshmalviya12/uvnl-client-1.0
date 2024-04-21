import { useState } from "react";

const ViewImage = ({ imageName, imageLink }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="active:bg-pink-600 mb-1 mr-1 rounded bg-primary px-3 py-1.5 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        view {imageName}
      </button>
      {showModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative mx-auto my-6 w-auto max-w-3xl">
            {/*content*/}
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-black">
              {/*header*/}
              <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                <h3 className="text-title-sm font-medium text-black dark:text-white">
                  {imageName}
                </h3>
              </div>
              {/*body*/}
              <div className="relative max-h-80 flex-auto overflow-y-auto p-6 md:max-h-90 lg:max-h-115">
                <img src={imageLink} alt="loading" className="max-w-80" />
              </div>
              {/*footer*/}
              <div className="border-blueGray-200 flex items-center justify-end gap-2 rounded-b border-t border-solid p-4 text-title-sm">
                <button
                  className="inline-flex items-center justify-center bg-danger px-1 py-1 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="inline-flex items-center justify-center bg-primary px-2 py-1 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
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
