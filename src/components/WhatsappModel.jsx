import { MdOutlineWhatsapp } from "react-icons/md";

const WhatsappModel = ({ whatsappNo }) => {
  return (
    <>
      <button
        className=" active:bg-pink-600  mb-1 mr-1 rounded bg-primary px-1 py-0.5 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none md:px-3 md:py-1.5"
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
