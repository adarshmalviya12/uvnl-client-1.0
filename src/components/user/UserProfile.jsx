import { useAuth } from "../../context/AuthContext";
import { MdMail, MdPerson, MdPhone } from "react-icons/md";

const UserProfile = () => {
  const { user } = useAuth();
  return (
    <>
      <h1 className="mb-4 text-title-lg">User Details </h1>
      <div className=" border-b border-stroke bg-white px-3 py-2 text-sm font-normal dark:border-strokedark dark:bg-black md:px-5 md:text-base">
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
