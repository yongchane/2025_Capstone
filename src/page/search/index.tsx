import InputPlace from "../../components/InputPlace";
import BackIcon from "../../assets/Back.svg?react";
import useLocationStore from "../../store/useLocationStore";
const Search = () => {
  const { end, start } = useLocationStore();
  console.log(end, start);
  return (
    <div>
      <div className="flex flex-col  mt-[24px] justify-between">
        <BackIcon />
      </div>
      <InputPlace width="400px" comwidth="300px" />
      <div>{end}</div>
    </div>
  );
};

export default Search;
