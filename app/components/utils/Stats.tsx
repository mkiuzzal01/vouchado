import Container from "../shared/Container";
import Clients from "../icons/Clients";
import Sold from "../icons/Sold";
import Partner from "../icons/Partner";
import Star from "../icons/Star";
import Review from "../icons/Review";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";

export default function Stats() {
  const stats = [
    {
      icon: <Clients size={30} />,
      value: "2,500+",
      label: "Happy Customers",
    },
    {
      icon: <Sold size={30} />,
      value: "50,000+",
      label: "Deals Sold",
    },
    {
      icon: <Partner size={30} />,
      value: "300+",
      label: "Local Partners",
    },
    {
      icon: <Review size={30} />,
      value: "4.8 Star",
      label: "Based on 12,500+ Review",
      star: <Star size={90} />,
    },
  ];

  return (
    <section className="relative w-full z-20 -bottom-10">
      <Container className="bg-white rounded-[24px] xl:rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/50 p-5 md:p-6 lg:p-8 xl:py-7 xl:px-4 shadow-2xl shadow-gray-200">
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-between w-full xl:divide-x divide-gray-200/80 gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-0 gap-x-2 md:gap-x-4 lg:gap-x-6 xl:gap-x-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-start sm:justify-center gap-3 md:gap-3 lg:gap-4 xl:gap-4 w-full sm:w-[45%] lg:w-[30%] xl:w-auto xl:flex-1 xl:px-2"
            >
              <div className="bg-[#31BFC8]/10 p-2.5 md:p-2.5 lg:p-3 xl:p-3.5 rounded-full flex-shrink-0 text-[#31BFC8]">
                {stat.icon}
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 text-xl md:text-lg lg:text-xl xl:text-2xl font-extrabold text-gray-900 whitespace-nowrap">
                  {stat.value} 
                  {stat.star && <div className="text-[#31BFC8] flex items-center -ml-1 mt-0.5 scale-90 md:scale-75 lg:scale-90 xl:scale-100 origin-left">{stat.star}</div>}
                </div>
                <div className="text-gray-400 text-sm md:text-xs lg:text-sm xl:text-sm font-medium mt-0.5 whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex items-center justify-start sm:justify-center w-full sm:w-[45%] lg:w-[30%] xl:w-auto xl:flex-1 xl:px-2">
            <AvatarGroup className="scale-90 md:scale-85 lg:scale-100 xl:scale-110">
              <Avatar className="border-2 border-white shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" alt="@user1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>

              <Avatar className="border-2 border-white shadow-sm">
                <AvatarImage src="https://github.com/evilrabbit.png" alt="@user2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>

              <Avatar className="border-2 border-white shadow-sm">
                <AvatarImage src="https://github.com/maxleiter.png" alt="@user3" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>

        </div>
      </Container>
    </section>
  );
}
