import SuccessMessage from "./__components/SuccessMessage";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
  role?: string;
}

export default async function success({ role, params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  return <SuccessMessage role={role} t={t} />;
}
