import Bag from "../icons/Bag";
import Scanner from "../icons/Scanner";
import Search from "../icons/Search";
import Container from "../shared/Container";

export default function Steps() {
  const steps = [
    {
      title: "1. Discover",
      description: "Find the best local deals near you.",
      icon: <Search size={40} />,
    },
    {
      title: "2. Purchase",
      description: "Buy securely and instantly online.",
      icon: <Bag size={40} />,
    },
    {
      title: "3. Redeem",
      description: "Redeem your deal and enjoy amazing experiences.",
      icon: <Scanner size={40} />,
    },
  ];

  return (
    <div>
      <Container className="rounded-4xl bg-gray-100 my-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 p-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-center gap-4">
              {/* Icon circle */}
              <div className="text-whatevvaa-darker">{step.icon}</div>

              <div>
                {/* Title */}
                <div className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </div>

                {/* Description */}
                <div className="text-gray-600 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
