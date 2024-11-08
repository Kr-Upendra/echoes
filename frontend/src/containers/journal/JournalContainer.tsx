import users from "../../assets/users";

export default function JournalContainer() {
  const moodColor = "#0000ab";
  return (
    <div className="h-full w-2/3 sm:w-full md:w-1/2 rounded-md grid grid-cols-2 md:grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
      {Array.from({ length: 4 }).map((_, index: number) => (
        <div
          key={index}
          style={{ borderColor: moodColor }}
          className={`px-4 border-t-[10px] pt-3 pb-6 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5`}
        >
          <h1 className="text-green-500 font-display line-clamp-1 sm:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-sm my-1 sm:text-xs text-gray-500 mb-4 h-20 line-clamp-4 md:h-17 sm:h-15">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa iure
            ipsum excepturi modi molestias inventore similique placeat dolorum
            ab accusamus. Aliquid eveniet veritatis officiis provident aut neque
            odit dolores in?
          </p>
          <div className="flex items-center gap-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img
                src={users.user01}
                alt={"hello user"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
