const Btn = ({ text }: { text: string }) => {
  return (
    <div className="w-[320px] h-[53px] bg-[#6488FF] rounded-lg flex items-center justify-center text-white text-center">
      {text}
    </div>
  );
};

export default Btn;
