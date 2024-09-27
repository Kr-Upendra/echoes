export default function CustomInput() {
  return (
    <div className="w-full mb-5">
      <label htmlFor="lastname" className="block mb-1 text-text-light">
        Lastname
      </label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Enter your lastname"
        className="w-full p-2 text-text-alpha outline-none border border-primary-alpha rounded-lg bg-background-mid"
      />
    </div>
  );
}
