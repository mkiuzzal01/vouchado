interface IProps {
  lang: string;
  status: string;
}

export default function Status({ lang, status }: IProps) {
  switch (lang) {
    case "en":
      switch (status) {
        case "Redeemed":
          return (
            <span className="text-green-500 font-semibold text-sm p-1 border-green-500 border rounded-full">
              Redeemed
            </span>
          );
        case "Unredeemed":
          return (
            <span className="text-yellow-500 font-semibold text-sm p-1 border-yellow-500 border rounded-full">
              Unredeemed
            </span>
          );
        default:
          return (
            <span className="text-red-500 font-semibold text-sm p-1 border-red-500 border rounded-full">
              Expired
            </span>
          );
      }
    case "de":
      switch (status) {
        case "Erlöst":
          return (
            <span className="text-green-500 font-semibold text-sm p-1 border-green-500 border rounded-full">
              Eingelöst
            </span>
          );
        case "Nicht eingelöst":
          return (
            <span className="text-yellow-500 font-semibold text-sm p-1 border-yellow-500 border rounded-full">
              Noch nicht eingelöst
            </span>
          );
        default:
          return (
            <span className="text-red-500 font-semibold text-sm p-1 border-red-500 border rounded-full">
              Abgelaufen
            </span>
          );
      }
  }
}
