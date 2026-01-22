import { GoDotFill } from "react-icons/go";

const TextAns = ({ text,i, answer, score}) => {
    return (
       <div key={i} className=" border border-[#ECECEC] rounded-lg p-2">
    <div className="flex flex-col gap-2">
      <p className="text-[#263238] font-semibold text-sm">{text}</p>
      <div className="flex flex-row justify-between gap-2">
        <p className="flex justify-start items-start gap-1">
          <span><GoDotFill className="text-lg text-[#60838C]"  /></span>
          <span className="text-[#606060] text-xs">{answer}</span>
        </p>
        {/* <p className="text-[#263238] text-sm font-semibold">{score}</p> */}
      </div>
    </div></div>
  );
};

export default TextAns;
