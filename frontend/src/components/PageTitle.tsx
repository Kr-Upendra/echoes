import Button from "./buttons/Button";
import LinkButton from "./buttons/LinkButton";

type Props = {
  title: string;
  buttonTitle: string;
  hrefValue?: string;
  isDisabled?: boolean;
  isButton?: boolean;
  buttonHandler?: () => void;
};

export default function PageTitle({
  title,
  buttonTitle,
  hrefValue,
  isDisabled,
  isButton = false,
  buttonHandler,
}: Props) {
  return (
    <div className="flex items-center justify-between py-6 px-4 sm:px-3 bg-gradient-to-l from-green-950 to-green-600 rounded-lg shadow-2xl shadow-green-500/10">
      <h1 className="text-white font-display text-xl">{title}</h1>
      {buttonTitle && isButton ? (
        <Button
          title={buttonTitle}
          isDisabled={isDisabled}
          onclick={buttonHandler}
        />
      ) : (
        <LinkButton
          title={buttonTitle}
          hrefValue={hrefValue}
          isDisabled={isDisabled}
        />
      )}
    </div>
  );
}
