import { MdOutlineWhatsapp } from "react-icons/md";

const WhatsappModel = ({ whatsappNo }) => {
  return (
    <>
      <button
        className=" bg-primary  text-white text-xs active:bg-pink-600 font-bold uppercase px-1 py-0.5 md:px-3 md:py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
      >
        <a href={`https://wa.me/91${whatsappNo}`} target="_">
          <div className="flex items-center gap-2">
            <MdOutlineWhatsapp /> Whatsapp
          </div>
        </a>
      </button>
    </>
  );
};
export default WhatsappModel;
