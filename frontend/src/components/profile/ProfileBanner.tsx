// import { FaEdit } from "react-icons/fa";
import default_bg_cover from "../../assets/bg/default_cover_image.jpg";

export default function ProfileBanner() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(34, 197, 94, 0.4), #000000a1), url(${default_bg_cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-80 md:h-64 sm:h-48 xs:h-40 rounded-lg shadow-2xl shadow-black/20"
    >
      {/* <button className="bg-green-500 text-white shadow-xl shadow-black/20 cursor-pointer rounded-full px-4 py-2 flex items-center gap-x-2 font-display">
        Edit
        <span>
          <FaEdit />
        </span>
      </button> */}
    </div>
  );
}
