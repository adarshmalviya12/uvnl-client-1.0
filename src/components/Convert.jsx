import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import axios from "axios";

const Convert = ({ products, leadId }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [convertedLeadId, setConvertedLeadId] = useState(null); // New state to store leadId

  useEffect(() => {
    setConvertedLeadId(leadId);
  }, [leadId]);

  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/user/convert-lead/${convertedLeadId}`,
        {
          productId: formData.productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Add success notification or redirect
      alert("Lead converted successfully!");

      setShowModal(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <button
        className=" active:bg-pink-600  mb-1 mr-1 rounded bg-primary px-1 py-0.5 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none md:px-3 md:py-1.5"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Convert Lead
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-9999 flex items-center justify-center  overflow-y-auto overflow-x-hidden outline-none  focus:outline-none md:max-h-171.5">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-black">
                {/*header*/}
                <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                  <h3 className="text-xs font-medium text-black dark:text-white">
                    Convert Lead
                  </h3>
                </div>
                {/*body*/}
                <div className="relative max-h-80 flex-auto overflow-y-auto p-6 md:max-h-90 lg:max-h-115">
                  <form
                    className="min-w-72.5 text-sm font-thin "
                    onSubmit={handleFormSubmit}
                  >
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full ">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Convert to opportunity
                        </label>
                        <select
                          name="productId"
                          value={formData.productId}
                          onChange={handleInputChange}
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-3 py-1.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {products.map((product, index) => (
                            <option
                              key={index}
                              value={product._id}
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-1.5 py-0.5 font-medium outline-none transition focus:border-primary focus:text-black-2 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="border-blueGray-200 flex items-center justify-end gap-2 rounded-b border-t border-solid p-4 text-title-sm">
                  <button
                    className="inline-flex items-center justify-center bg-danger px-2 py-1 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="inline-flex items-center justify-center bg-primary px-2 py-1 text-center font-normal  text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={handleFormSubmit}
                  >
                    Convert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default Convert;
