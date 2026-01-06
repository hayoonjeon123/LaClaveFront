import Logo from "@/assets/Logo.png";

const LogIn = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="absolute left-1/2 -translate-x-1/2">
        <img
          src={Logo}
          alt="logo"
          className="h-[40px] mt-[20px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export { LogIn };
