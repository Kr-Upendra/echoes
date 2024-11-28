import LinkButton from "./buttons/LinkButton";

type Props = {
  title?: string;
  message?: string;
  containerStyle?: string;
} & (
  | {
      hasUrl: true;
      buttonTitle: string;
      hrefValue: string;
    }
  | {
      hasUrl?: false;
      buttonTitle?: never;
      hrefValue?: never;
    }
);

export default function NoRecord({
  title,
  message,
  containerStyle,
  hasUrl = false,
  buttonTitle,
  hrefValue,
}: Props) {
  return (
    <div
      className={`border border-green-500/10 shadow-2xl shadow-green-500/20 bg-black/80 w-full px-4 py-16 rounded-lg ${containerStyle}`}
    >
      <div className="flex justify-center items-center">
        <h1 className="font-display text-center text-lg">
          {title || "No records found."}
        </h1>
        <p>{message}</p>
      </div>
      <div className="mt-4 text-center">
        {hasUrl && buttonTitle && (
          <LinkButton title={buttonTitle} hrefValue={hrefValue} />
        )}
      </div>
    </div>
  );
}
