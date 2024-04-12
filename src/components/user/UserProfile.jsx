import { useAuth } from "../../context/AuthContext";
import { MdMail, MdPerson, MdPhone } from "react-icons/md";

const UserProfile = () => {
  const { user } = useAuth();
  return (
    <>
      <h1 className="text-title-lg mb-4">User Details </h1>
      <div className=" border-b border-stroke font-normal text-sm md:text-base px-3 md:px-5 py-2 dark:border-strokedark bg-white dark:bg-black">
        <div>
          <p className="text-gray-600 mb-2 flex items-center gap-2">
            <MdPerson /> <span className="font-bold">Name :</span>
            {`${user.firstName} ${
              user.middleName ? user.middleName + " " : ""
            }${user.lastName}`}
          </p>
          <p className="text-gray-600 mb-2 flex items-center gap-2">
            <MdMail />
            <span className="font-bold">Email: </span> {user.email}
          </p>
          <p className="text-gray-600 mb-2 flex items-center gap-2">
            <MdPhone />
            <span className="font-bold">Number: </span> {user.number}
          </p>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
