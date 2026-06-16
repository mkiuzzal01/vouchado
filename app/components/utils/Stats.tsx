import Container from "../shared/Container";
import Clients from "../icons/Clients";
import Sold from "../icons/Sold";
import Partner from "../icons/Partner";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import Star from "../icons/Star";
import Review from "../icons/Review";

export default function Stats() {
  const stats = [
    {
      icon: <Clients size={32} />,
      value: "2,500+",
      label: "Happy Customers",
    },
    {
      icon: <Sold size={32} />,
      value: "50,000+",
      label: "Deals Sold",
    },
    {
      icon: <Partner size={32} />,
      value: "300+",
      label: "Local Partners",
    },
    {
      icon: <Review size={32} />,
      value: "4.8 Star",
      label: "Based on 12,500+ Review",
      star: <Star size={100} />,
    },
  ];

  return (
    <section className="relative w-full -bottom-20">
      <Container className="bg-white py-5 rounded-xl shadow">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition duration-300"
            >
              <div className="text-gray-500">{stat.icon}</div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-sm md:text-lg font-bold text-gray-900">
                  {stat.value} {stat.star && <div>{stat.star}</div>}
                </div>
                <div className="text-gray-700 text-xs md:text-md font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition duration-300">
            <AvatarGroup>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@user1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@user2"
                />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@user3"
                />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>

              <AvatarGroupCount>+12k</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
