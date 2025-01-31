import Button from "./buttons/Button";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
};

export default function DeleteModel({ onCancel, onConfirm, message }: Props) {
  return (
    <main className="flex justify-center items-center h-full w-full">
      <div className="max-w-[500px] sm:w-full py-10 sm:py-6 px-8 sm:px-8 xs:px-4 big-shadow bg-[#0e110f] rounded-md">
        <h2 className="text-center mb-6">{message}</h2>
        <div className="flex justify-center gap-x-5 px-16 sm:px-0 sm:gap-x-2">
          <Button
            title="Cancel"
            onclick={onCancel}
            extraStyle="text-white bg-green-600 hover:bg-orange-600 hover:border-orange-600 w-full"
          />
          <Button
            title="Yes Delete"
            onclick={onConfirm}
            extraStyle="text-white bg-green-600 w-full"
          />
        </div>
      </div>
    </main>
  );
}
